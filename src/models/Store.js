import { decorate, observable } from 'mobx';
import User from './User';
import { dbService, authService } from 'src/services/firebase';
import { toast } from 'react-toastify';

class Store {
  user = null;
  todoList = new Map();
  isFetching = true;

  constructor(user) {
    this.user = new User(user);

    // Shortcut
    this._db = {
      todos: dbService
        .collection('todoList')
        .doc(this.user.uid)
        .collection('todos'),
      genId() {
        return dbService
          .collection('todoLists')
          .doc(this.user.uid)
          .collection('todos')
          .doc().id;
      }
    };
  }

  signOut() {
    authService
      .signOut()
      .then(() => console.log('signout'))
      .catch(err => console.log(err));
  }

  fetchTodos = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const { empty, docs } = await this._db.todos.get();

        if (!empty) {
          docs.forEach(doc => {
            const payload = doc.data();
            this.todoList.set(doc.id, payload);
          });
        }
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  };

  _dispatchError(err) {
    toast.error(`Oops something wrong, ${err}`);
  }

  addTodo = async payload => {
    const todoId = this._db.genId();
    const todo = {
      id: todoId,
      done: false,
      createdAt: Date.now(),
      updatedAt: null,
      ...payload
    };

    try {
      await this._db.doc(todo.id).set(todo);
      this.todoList.set(todo.id, todo);
    } catch (err) {
      this._dispatchError(err);
    }
  };

  removeTodo = async todoId => {
    try {
      await this._db.todos.doc(todoId).delete();
      this.todoList.delete(todoId);
    } catch (err) {
      reject(err);
    }
  };

  toggleDone = id => {
    const todo = this.todoList.get(id);
    todo.done = !todo.done;

    this.updateTodo(id, { done: todo.done });
  };

  updateTodo = async (id, payload) => {
    const todo = this.todoList.get(id);
    try {
      await this._db.todos.doc(id).update(payload);
      this.todoList.set(id, { ...todo, ...payload, updatedAt: Date.now() });
    } catch (err) {
      reject(err);
    }
  };
}

export default decorate(Store, {
  todoList: observable
});
