/* @flow */
import Todo from './Todo';
import EventEmitter from './EventEmitter';
import { db, uuid } from 'src/utils';

const defaultLists = [
  { id: uuid(), label: 'To-Do', writable: false },
  { id: uuid(), label: 'Grocery', writable: false }
];

class Store extends EventEmitter {
  collection: Array<dasdadas> = [];
  done = 0;
  activeList = null;
  lists = [];
  todos = [];

  async fetchLists() {
    if ((await db.lists.count()) === 0) {
      await db.lists.bulkAdd(defaultLists);
    }

    this.lists = await db.lists.toArray();
  }

  find(id) {
    return db.lists.get({ id });
  }

  save({ id = uuid(), label = 'Untitled' }) {
    return db.lists.put({ id, label, writable: true });
  }

  remove(id) {
    return db.lists;
  }

  async fetchTodos(listId) {
    this.activeList = await ListStore.find(listId);
    this.collection = (await db.todos.where({ listId: listId }).toArray())
      .map(todo => new Todo(todo))
      .reverse();
  }

  set collection(item) {
    this._collection = item;
    this.done = 0;
    item.forEach(todo => todo.done && this.done++);
    this.dispatch(this.events.ON_CHANGE, {
      list: this.activeList,
      todos: this.collection
    });
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
    const todo = new Todo({
      id: null,
      done: false,
      createdBy: null,
      ModifiedBy: null,
      createdAt: Date.now(),
      updatedAt: null,
      listId: this.activeList.id,
      ...payload
    });
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
