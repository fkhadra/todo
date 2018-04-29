import { decorate, observable } from 'mobx';
import User from './User';
import { dbService, authService } from 'src/services/firebase';
import { uuid } from 'src/utils';

class Store {
  user = null;
  userList = new Map();
  todoList = new Map();
  activeList = null;

  constructor(user) {
    this.user = new User(user);
    this.fetchUserList();
  }

  signOut(){
    authService.signOut().then(() => console.log('signout')).catch(err=> console.log(err));
  }

  fetchUserList() {
    dbService
      .collection('userLists')
      .where(this.user.uid, '==', true)
      //.orderBy('createdAt')
      .get()
      .then(({ empty, docs }) => {
        if (!empty) {
          docs.forEach(doc =>
            this.userList.set(doc.id, { id: doc.id, ...doc.data() })
          );
        } else {
          this.addDefaultList();
        }
      })
      .catch(err => console.log(err));
  }

  addDefaultList() {
    const batch = dbService.batch();
    batch.set(
      dbService.collection('userLists').doc(),
      this.createList({ label: 'To-Do', writable: false })
    );
    batch.set(
      dbService.collection('userLists').doc(),
      this.createList({ label: 'Grocery', writable: false })
    );

    batch
      .commit()
      .then(commit => console.log('commit', commit))
      .catch(err => console.log(err));
  }

  createList(payload) {
    return {
      label: 'Untitled',
      writable: true,
      [this.user.uid]: true,
      createdAt: Date.now(),
      ...payload
    };
  }

  fetchTodoList(listId) {
    dbService
      .collection('todoList')
      .doc(listId)
      .collection('todos')
      .where(this.user.uid, '==', true)
      .get()
      .then(({ empty, docs }) => {
        this.activeList = this.userList.get(listId);
        if (!empty) {
          docs.forEach(doc => this.todoList.set(doc.id, doc.data()));
        } else {
          this.todoList = new Map();
        }
      })
      .catch(err => console.log(err));
  }

  addTodo = payload => {
    const todo = {
      id: uuid(),
      done: false,
      createdBy: null,
      ModifiedBy: null,
      createdAt: Date.now(),
      updatedAt: null,
      [this.user.uid]: true,
      ...payload
    };

    dbService
      .collection('todoList')
      .doc(this.activeList.id)
      .collection('todos')
      .doc(todo.id)
      .set(todo)
      .then(() => this.todoList.set(todo.id, todo))
      .catch(err => console.log(err));
  };

  removeTodo = todoId => {
    dbService
      .collection('todoList')
      .doc(this.activeList.id)
      .collection('todos')
      .doc(todoId)
      .delete()
      .then(() => {
        this.todoList.delete(todoId);
      })
      .catch(err => console.log(err));
  };

  toggleDone = id => {
    const todo = this.todoList.get(id);
    todo.done = !todo.done;

    this.updateTodo(id, { done: todo.done });
  };

  updateTodo = (id, payload) => {
    const todo = this.todoList.get(id);
    this.todoList.set(id, { ...todo, ...payload, updatedAt: Date.now() });
    dbService
      .collection('todoList')
      .doc(this.activeList.id)
      .collection('todos')
      .doc(id)
      .update(payload)
      .then(() => {
        console.log('done');
      })
      .catch(err => console.log(err));
  };

  genTodoListId() {
    return dbService.collection('todoList').doc().id;
  }

  addUserList(id) {
    const newList = this.createList();
    dbService
      .collection('userLists')
      .doc(id)
      .set(newList)
      .then(
        () =>
          (this.activeList = this.userList
            .set(id, { id: id, ...newList })
            .get(id))
      )
      .catch(err => console.log(err));
  }

  saveUserList(payload) {
    dbService
      .collection('userLists')
      .doc(this.activeList.id)
      .update(payload)
      .then(
        () =>
          (this.activeList = this.userList
            .set(this.activeList.id, {
              ...this.activeList,
              ...payload
            })
            .get(this.activeList.id))
      )
      .catch(err => console.log(err));
  }
}

export default decorate(Store, {
  userList: observable,
  todoList: observable,
  activeList: observable
});
