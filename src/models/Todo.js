function uuid(a) {
  return a
    ? (a ^ ((Math.random() * 16) >> (a / 4))).toString(16)
    : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uuid);
}

class Todo {
  constructor({
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
