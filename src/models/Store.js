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
    this.registerProfile();
    this.fetchUserList();
    // this.shareList()
  }

  registerProfile() {
    dbService
      .collection('profiles')
      .doc(this.user.uid)
      .get()
      .then(async ({ exists }) => {
        if (!exists) {
          await dbService
            .collection('profiles')
            .doc(this.user.uid)
            .set({ ...this.user });
        }
      })
      .catch(err => console.log(err));
  }

  signOut() {
    authService
      .signOut()
      .then(() => console.log('signout'))
      .catch(err => console.log(err));
  }

  fetchUserList() {
    dbService
      .collection('lists')
      .where(`member.${this.user.uid}`, '==', true)
      .get()
      .then(({ empty, docs }) => {
        if (!empty) {
          docs.forEach(doc => this.userList.set(doc.id, doc.data()));
        } else {
          this.addDefaultList();
        }
      })
      .catch(err => console.log(err));
  }

  addDefaultList() {
    const batch = dbService.batch();
    const ref = dbService.collection('lists');
    let id = this.genListId();

    batch.set(
      ref.doc(id),
      this.userList
        .set(id, this.createList({ id, label: 'To-Do', writable: false }))
        .get(id)
    );

    id = this.genListId();

    batch.set(
      ref.doc(id),
      this.userList
        .set(id, this.createList({ id, label: 'Grocery', writable: false }))
        .get(id)
    );

    batch
      .commit()
      .then(() => console.log('commit'))
      .catch(err => console.log(err));
  }

  createList(payload) {
    return {
      label: 'Untitled',
      writable: true,
      owner: this.user.uid,
      member: {
        [this.user.uid]: true
      },
      createdAt: Date.now(),
      ...payload
    };
  }

  fetchTodoList(listId) {
    dbService
      .collection('todoList')
      .doc(listId)
      .collection('todo')
      .where(`member.${this.user.uid}`, '==', true)
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
      owner: this.user.uid,
      member: {
        [this.user.uid]: true
      },
      ...payload
    };

    dbService
      .collection('todoList')
      .doc(this.activeList.id)
      .collection('todo')
      .doc(todo.id)
      .set(todo)
      .then(() => this.todoList.set(todo.id, todo))
      .catch(err => console.log(err));
  };

  removeTodo = todoId => {
    dbService
      .collection('todoList')
      .doc(this.activeList.id)
      .collection('todo')
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
      .collection('todo')
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

  genListId() {
    return dbService.collection('lists').doc().id;
  }

  addUserList(id) {
    const newList = this.createList({ id });
    dbService
      .collection('lists')
      .doc(id)
      .set(newList)
      .then(() => (this.activeList = this.userList.set(id, newList).get(id)))
      .catch(err => console.log(err));
  }

  saveUserList(payload) {
    dbService
      .collection('lists')
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

  shareList(a) {
    let email = 'fdkhadra@gmail.com';
    authService.fetchProvidersForEmail(email).then(async payload => {
      if (payload.length === 0) {
        console.log('User dont exist');
      } else {
        console.log('User xist');
        const { docs } = await dbService
          .collection('profile')
          .where('email', '==', email)
          .get();
        console.log('profie', docs[0].data());
      }
    });
  }
}

export default decorate(Store, {
  userList: observable,
  todoList: observable,
  activeList: observable
});
