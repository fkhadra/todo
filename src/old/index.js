import Dexie from 'dexie';

const db = new Dexie('toodos');

db.version(1).stores({
  lists: 'id',
  todos: '&id, listId'
});

function uuid(a) {
  return a
    ? (a ^ ((Math.random() * 16) >> (a / 4))).toString(16)
    : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uuid);
}

const keys = {
  ENTER: 13,
  ESCAPE: 27
};

export { db, keys, uuid };
