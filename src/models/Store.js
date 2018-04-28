import { decorate, observable } from 'mobx';
// import Todo from './Todo';
// import List from './List';
import User from './User';
import { dbService, authService } from 'src/services/firebase';
import { uuid } from 'src/utils';

class Store {
  user = null;
  userList = [];
  todoList = [];
  activeListId = null;

  constructor(user) {
    this.user = new User(user);
    this.fetchUserList();
  }

  fetchUserList() {
    dbService
      .collection('userLists')
      .where(this.user.uid, '==', true)
     // .orderBy('createdAt', 'asc')
      .get()
      .then(({ empty, docs }) => {
        if (!empty) {
          this.userList = docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } else {
          this.addDefaultList();
        }
      })
      .catch(err => console.log(err));
  }

  fetchTodoList(listId) {
    this.activeListId = listId;
    dbService
      .collection('todoList')
      .doc(listId)
      .collection('todos')
      .where(this.user.uid, '==', true)
      .get()
      .then(({ empty, docs }) => {
        if(!empty) {
          this.todoList = docs.map(doc => doc.data())
        }
      })
      .catch(err => console.log(err));
  }

  addDefaultList() {
    const batch = dbService.batch();
    batch.set(
      dbService.collection('userLists').doc(),
      this.createList('To-Do', false)
    );
    batch.set(
      dbService.collection('userLists').doc(),
      this.createList('Grocery', false)
    );

    batch
      .commit()
      .then(commit => console.log('commit', commit))
      .catch(err => console.log(err));
  }

  createList(label, writable = true) {
    return { label, writable, [this.user.uid]: true, createdAt: Date.now() };
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
      .doc(this.activeListId)
      .collection('todos')
      .doc(todo.id)
      .set(todo)
      .then(() => console.log('added'))
      .catch(err => console.log(err));
  };

  // getDone() {
  //   const done = this.todos.reduce(
  //     (acc, todo) => (todo.done ? acc + 1 : acc),
  //     0
  //   );
  //   return {
  //     number: done,
  //     percentage: done / this.todos.length * 100
  //   };
  // }

  // async fetchTodos(listId) {
  //   this.activeList = await this.list.find(listId);
  //   this.todos = (await db.todos.where({ listId: listId }).toArray())
  //     .map(todo => new Todo(todo))
  //     .reverse();
  // }

  // addTodo = payload => {
  //   const todo = new Todo({
  //     id: uuid(),
  //     done: false,
  //     createdBy: null,
  //     ModifiedBy: null,
  //     createdAt: Date.now(),
  //     updatedAt: null,
  //     listId: this.activeList.id,
  //     ...payload
  //   });
  //   return db.todos.put(todo).then(() => (this.todos = [todo, ...this.todos]));
  // };

  // updateTodo = (id, payload) => {
  //   this.todo = this.todos.map(todo => {
  //     if (todo.id === id) {
  //       todo.update(payload);
  //       db.todos.put(todo);
  //     }
  //     return todo;
  //   });
  // };

  // removeTodo = id =>
  //   db.todos
  //     .delete(id)
  //     .then(() => (this.todos = this.todos.filter(todo => todo.id !== id)));

  // toggleDone = id => {
  //   this.todos = this.todos.map(todo => {
  //     if (todo.id === id) {
  //       todo.done = !todo.done;
  //       db.todos.put(todo);
  //     }
  //     return todo;
  //   });
  // };

  // saveList(...args) {
  //   return this.list.save(...args);
  // }
}

export default decorate(Store, {
  userList: observable,
  todoList: observable
});
