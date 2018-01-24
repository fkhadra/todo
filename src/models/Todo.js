import { uuid } from 'src/utils';

class Todo {
  constructor({
    listId,
    id = null,
    value = '',
    done = false,
    createdBy = null,
    ModifiedBy = null,
    createdAt = null,
    updatedAt = null
  }) {
    const now = Date.now();

    this.id = id || uuid();
    this.listId = listId;
    this.value = value;
    this.done = done;
    this.createdBy = createdBy;
    this.ModifiedBy = ModifiedBy;
    this.createdAt = createdAt || now;
    this.updatedAt = updatedAt;
  }

  update(payload) {
    Object.assign(this, {
      ...payload,
      updatedAt: Date.now()
    });
  }
}

export default Todo;
