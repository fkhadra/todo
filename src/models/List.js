import { observable, decorate } from 'mobx';
import { db, uuid } from 'src/utils';
import { dbService, authService } from 'src/services/firebase';

const defaultLists = {
  [uuid()]: { label: 'To-Do', writable: false },
  [uuid()]: { label: 'Grocery', writable: false },
};

class List {
  collection = [];
  //userId = null;

  constructor(userId) {
    //this.userId = userId;
    this.fetch();
  }

  fetch() {
    console.log(authService.currentUserS)
    
  }

  find(id) {
    return db.lists.get({ id });
  }

  async save({ id = uuid(), label = 'Untitled' }) {
    await db.lists.put({ id, label, writable: true });
    this.fetch();
  }
}

export default decorate(List, {
  collection: observable
});
