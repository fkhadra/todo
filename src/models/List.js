import { observable, decorate } from 'mobx';
import { db, uuid } from 'src/utils';
import { dbService, authService } from 'src/services/firebase';

const defaultLists = [
  { id: uuid(), label: 'To-Do', writable: false },
  { id: uuid(), label: 'Grocery', writable: false }
];

class List {
  collection = [];
  //userId = null;

  constructor(userId) {
    //this.userId = userId;
    this.fetch();
  }

  fetch() {
    dbService.ref(`list/igZ2dfJCeQMImxso11f7mHFDmiv1`).on('value', snapshot => {
     const payload = snapshot.val();
     if( payload === null ) {
       dbService.ref(`list/igZ2dfJCeQMImxso11f7mHFDmiv1`).set(defaultLists);
       this.collection = defaultLists;
       return;
     }

      this.collection = snapshot.val();
    });
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
