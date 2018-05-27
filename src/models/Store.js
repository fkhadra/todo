import { decorate, observable } from 'mobx';
import User from './User';
import { dbService, authService } from 'src/services/firebase';

class Store {
  user = null;
  todoList = new Map();

  constructor(user) {
    this.user = new User(user);

    // Shortcut
    this._db = {
      todos: dbService
        .collection('todoList')
        .doc(this.user.uid)
        .collection('todos'),
      genId: () => {
        return dbService
          .collection('todoLists')
          .doc(this.user.uid)
          .collection('todos')
          .doc().id;
      }
    };
  }

  async signOut() {
    await authService.signOut();
  }

  fetchTodos = async () => {
    const { empty, docs } = await this._db.todos.get();

    if (!empty) {
      docs.forEach(doc => {
        const payload = doc.data();
        this.todoList.set(doc.id, payload);
      });
    }
  };

  addTodo = async payload => {
    const todoId = this._db.genId();
    const todo = {
      id: todoId,
      done: false,
      createdAt: Date.now(),
      updatedAt: null,
      ...payload
    };
    this.todoList.set(todo.id, todo);

    await this._db.todos.doc(todo.id).set(todo);
  };

  removeTodo = async todoId => {
    this.todoList.delete(todoId);
    await this._db.todos.doc(todoId).delete();
  };

  toggleDone = id => {
    const todo = this.todoList.get(id);
    todo.done = !todo.done;

    this.updateTodo(id, { done: todo.done });
  };

  updateTodo = async (id, payload) => {
    const todo = this.todoList.get(id);
    this.todoList.set(id, { ...todo, ...payload, updatedAt: Date.now() });
    await this._db.todos.doc(id).update(payload);
  };
}

export default decorate(Store, {
  todoList: observable
});
