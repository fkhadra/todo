/* @flow */

type todo = {
  listId: string,
  value: string,
  id: string,
  done: boolean,
  createdBy: string | null,
  modifiedBy: string | null,
  createdAt: number,
  updatedAt: number | null
};

class Todo {
  listId: string;
  value: string;
  id: string;
  done: boolean;
  createdBy: string | null;
  modifiedBy: string | null;
  createdAt: number;
  updatedAt: number | null;
  
  constructor({
    listId,
    value,
    id,
    done,
    createdBy,
    modifiedBy,
    createdAt,
    updatedAt
  }: todo) {
    this.id = id;
    this.listId = listId;
    this.value = value;
    this.done = done;
    this.createdBy = createdBy;
    this.modifiedBy = modifiedBy;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  update(payload: todo): void {
    Object.assign(this, {
      ...payload,
      updatedAt: Date.now()
    });
  }
}

export default Todo;
