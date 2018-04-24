import { decorate, observable } from 'mobx';
import Todo from './Todo';
import List from './List';
import { db, uuid } from 'src/utils';


class Store {
  activeList = null;
  list = new List();
  todos = [];

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
    this.activeList = await this.list.find(listId);
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
    return this.list.save(...args);
  }
}

const ObservableStore = decorate(Store, {
  activeList: observable,
  todos: observable
})

export default new ObservableStore();
