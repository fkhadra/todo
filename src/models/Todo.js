class Todo {
  constructor({
    listId,
    value,
    id,
    done,
    createdBy,
    modifiedBy,
    createdAt,
    updatedAt
  }) {
    this.id = id;
    this.listId = listId;
    this.value = value;
    this.done = done;
    this.createdBy = createdBy;
    this.modifiedBy = modifiedBy;
    this.createdAt = createdAt;
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
