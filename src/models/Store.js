import Todo from './Todo';
import List from './List';
import EventEmitter from './EventEmitter';
import { db, uuid } from 'src/utils';

const eventEmitter = new EventEmitter();

class Store {
  activeList = null;
  lists = new List();
  todos = [];

  constructor() {
    this.lists.onChange(lists => {
      lists.some(list => {
        console.log(list);
        if (
          this.activeList !== null &&
          list.id === this.activeList.id &&
          list.label !== this.activeList.label
        ) {
          this.activeList = list;
          this.todos = this.todos;
          return true;
        }
        return false;
      });
    });
  }

  set todos(val) {
    this._todos = val;
    eventEmitter.dispatch({
      list: this.activeList,
      todos: this.todos
    });
    console.log('set')
  }

  get todos(){
    return this._todos;
  }

  onChange(cb) {
    return eventEmitter.subscribe(cb);
  }

  getDone() {
    const done = this.todos.reduce(
      (acc, todo) => (todo.done ? acc + 1 : acc),
      0
    );
    return {
      number: done,
      percentage: done / this.todos.length * 100
    };
  }

  async fetchTodos(listId) {
    this.activeList = await this.lists.find(listId);
    this.todos = (await db.todos.where({ listId: listId }).toArray())
      .map(todo => new Todo(todo))
      .reverse();
  }

  addTodo = payload => {
    const todo = new Todo({
      id: uuid(),
      done: false,
      createdBy: null,
      ModifiedBy: null,
      createdAt: Date.now(),
      updatedAt: null,
      listId: this.activeList.id,
      ...payload
    });
    return db.todos.put(todo).then(() => (this.todos = [todo, ...this.todos]));
  };

  updateTodo = (id, payload) => {
    this.todo = this.todos.map(todo => {
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
      .then(() => (this.todos = this.todos.filter(todo => todo.id !== id)));

  toggleDone = id => {
    this.todos = this.todos.map(todo => {
      if (todo.id === id) {
        todo.done = !todo.done;
        db.todos.put(todo);
      }
      return todo;
    });
  };

  saveList(...args){
    return this.lists.save(...args);
  }
}

export default new Store();
