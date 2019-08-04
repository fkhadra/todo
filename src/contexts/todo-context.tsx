import React, { useState, useContext, createContext, useEffect } from 'react';

import { dbService } from '../firebase';
import { UserInfo } from './auth-context';

export interface Todo {
  id: string;
  done: boolean;
  createdAt: number;
  updatedAt: number | null;
  value: string;
}

export type UpdatePayload = Partial<Todo>;

export interface UseTodos {
  list: () => Todo[];
  setFilter: (filter: Filter) => void;
  add: (value: string) => void;
  remove: (id: string) => void;
  toggle: (id: string) => void;
  update: (id: string, payload: UpdatePayload) => void;
}

const TodoContext = createContext<UseTodos>({} as UseTodos);

export const useTodos = () => useContext(TodoContext);

const applyFilter = {
  ALL: (_todo: Todo) => true,
  ACTIVE: (todo: Todo) => !todo.done,
  DONE: (todo: Todo) => todo.done
};
export type Filter = keyof typeof applyFilter;

export const TodosProvider: React.FC<{ user: UserInfo }> = ({
  user,
  children
}) => {
  const [filter, setFilter] = useState<Filter>('ALL');
  const [todoList, updateList] = useState<Todo[]>([]);
  const collection = dbService
    .collection('todoList')
    .doc(user.id)
    .collection('todos');
  const genId = () => collection.doc().id;

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    const { empty, docs } = await collection.get();
    if (!empty) updateList(docs.map(doc => doc.data()) as Todo[]);
  }

  async function add(value: string) {
    const todo = {
      id: genId(),
      done: false,
      createdAt: Date.now(),
      updatedAt: null,
      value: value
    };
    updateList([todo, ...todoList]);

    await collection.doc(todo.id).set(todo);
  }

  async function remove(reqId: string) {
    updateList(todoList.filter(({ id }) => id !== reqId));
    await collection.doc(reqId).delete();
  }

  async function update(reqId: string, payload: UpdatePayload) {
    updateList(
      todoList.map(todo => {
        if (todo.id === reqId) todo = { ...todo, ...payload };
        return todo;
      })
    );
    await collection.doc(reqId).update(payload);
  }

  function toggle(reqId: string) {
    const todo = todoList.find(todo => todo.id === reqId);
    if (todo) {
      todo.done = !todo.done;
      update(reqId, todo);
    }
  }

  function list() {
    return todoList.filter(applyFilter[filter]);
  }

  const contextValue = {
    list,
    setFilter,
    add,
    remove,
    update,
    toggle
  };

  return (
    <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
  );
};
