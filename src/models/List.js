import EventEmitter from './EventEmitter';
import { db, uuid } from 'src/utils';

const defaultLists = [
  { id: uuid(), label: 'To-Do', writable: false },
  { id: uuid(), label: 'Grocery', writable: false }
];

const eventEmitter = new EventEmitter();

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

  set collection(item) {
    this._collection = item;
    eventEmitter.dispatch(this._collection);
  }

  get collection() {
    return this._collection;
  }

  onChange(cb) {
    return eventEmitter.subscribe(cb);
  }

  find(id) {
    return db.lists.get({ id });
  }

  async save({ id = uuid(), label = 'Untitled' }) {
    await db.lists.put({ id, label });
    this.fetch();
  }

  // remove(id){
  //   return db.lists
  // }
}

export default List;
