import Todo from './Todo';
import EventEmitter from './EventEmitter';

class TodoStore extends EventEmitter {
  collection = [];
  done = 0;

  onChange(cb) {
    return this.on(this.events.ON_CHANGE, cb);
  }

  set collection(item) {
    this._collection = item;
    this.done = 0 ;
    item.forEach( todo => todo.done && this.done++);
    this.dispatch(this.events.ON_CHANGE, this._collection);
  }

  get collection() {
    return this._collection;
  }

  getDone(){
    return {
      number: this.done,
      percentage: (this.done / this.collection.length) * 100
    }
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
