import Todo from './Todo';
import EventEmitter from './EventEmitter';

class TodoStore extends EventEmitter {
  collection = [];

  onChange(cb) {
    return this.on(this.events.ON_CHANGE, cb);
  }

  set collection(item) {
    this._collection = item;
    this.dispatch(this.events.ON_CHANGE, this._collection);
  }

  get collection() {
    return this._collection;
  }

  addTodo = payload => {
    const todo = new Todo(payload);
    this.collection = [todo, ...this.collection];
  };

  updateTodo = (id, payload) => {
    this.collection = this.collection.map(todo => {
      if (todo.id === id) {
        todo.update(payload);
      }
      return todo;
    });
  };

  removeTodo = id => {
    this.collection = this.collection.filter(todo => todo.id !== id);
  };

  toggleDone = id => {
    this.collection = this.collection.map(todo => {
      if (todo.id === id) {
        todo.done = !todo.done;
      }
      return todo;
    });
  };
}

export default new TodoStore();
