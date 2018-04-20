import { observable, decorate } from 'mobx';
import { db, uuid } from 'src/utils';

const defaultLists = [
  { id: uuid(), label: 'To-Do', writable: false },
  { id: uuid(), label: 'Grocery', writable: false }
];

class List {
  collection = [];

  constructor() {
    this.fetch();
  }

  async fetch() {
    if ((await db.lists.count()) === 0) {
      await db.lists.bulkAdd(defaultLists);
    }
    this.collection = await db.lists.toArray();
  }

  find(id) {
    return db.lists.get({ id });
  }

  async save({ id = uuid(), label = 'Untitled' }) {
    await db.lists.put({ id, label });
    this.fetch();
  }
}

export default decorate(List, {
  collection: observable
});
