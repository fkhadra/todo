/* @flow */

import EventEmitter from './EventEmitter';
import { db } from 'src/utils';

class List extends EventEmitter {
  collection: Array<object> = [];

  constructor() {
    super();
    this.fetchLists();
  }

  set collection(item: Array<object>) {
    this._collection = item;
    this.dispatch(this.events.ON_CHANGE, this._collection);
  }

  get collection(): Array<object> {
    return this._collection;
  }

  async fetchLists(): Promise<any> {
    if ((await db.lists.count()) === 0) {
      await db.lists.bulkAdd(defaultLists);
    }
    this.collection = await db.lists.toArray();
  }

  find(id): Promise {
    return db.lists.get({ id });
  }

  save({ id = uuid(), label = 'Untitled' }) {
    return db.lists.put({ id, label, writable: true });
  }

  remove(id){
    return db.lists
  }
}

export default List;
