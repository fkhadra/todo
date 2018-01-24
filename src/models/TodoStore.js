import Todo from './Todo';
import EventEmitter from './EventEmitter';
import { db } from 'src/utils';

class TodoStore extends EventEmitter {
  collection = [];
  done = 0;
  activeList = null;

  async fetchTodos(listId) {
    this.activeList = listId;
    this.collection = (await db.todos.where({ listId: listId }).toArray())
      .map(todo => new Todo(todo))
      .reverse();
  }

  set collection(item) {
    this._collection = item;
    this.done = 0;
    item.forEach(todo => todo.done && this.done++);
    this.dispatch(this.events.ON_CHANGE, this._collection);
  }

  get collection() {
    return this._collection;
  }

  getDone() {
    return {
      number: this.done,
      percentage: this.done / this.collection.length * 100
    };
  }

  addTodo = payload => {
    const todo = new Todo({ ...payload, listId: this.activeList });
    return db.todos
      .put(todo)
      .then(() => (this.collection = [todo, ...this.collection]));
  };

  updateTodo = (id, payload) => {
    this.collection = this.collection.map(todo => {
      if (todo.id === id) {
        todo.update(payload);
        db.todos.put(todo);
      }
      return todo;
    });
  };

  removeTodo = id =>
    db.todos
      .delete(id)
      .then(
        () => (this.collection = this.collection.filter(todo => todo.id !== id))
      );

  toggleDone = id => {
    this.collection = this.collection.map(todo => {
      if (todo.id === id) {
        todo.done = !todo.done;
        db.todos.put(todo);
      }
      return todo;
    });
  };
}

export default new TodoStore();
