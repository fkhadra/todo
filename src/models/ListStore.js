import EventEmitter from './EventEmitter';
import { db, uuid } from 'src/utils';

const defaultLists = [
  { id: uuid(), label: 'To-Do', writable: false },
  { id: uuid(), label: 'Grocery', writable: false }
];

class ListStore extends EventEmitter {
  collection = [];

  constructor() {
    super();
    this.fetchLists();
  }

  set collection(item) {
    this._collection = item;
    this.dispatch(this.events.ON_CHANGE, this._collection);
  }

  get collection() {
    return this._collection;
  }

  async fetchLists() {
    if (await db.lists.count() === 0) {
      await db.lists.bulkAdd(defaultLists);
    }
    this.collection = await db.lists.toArray();
  }


}

export default new ListStore();
