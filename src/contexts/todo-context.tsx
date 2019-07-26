import React, { useState, useContext, createContext } from 'react';

export interface Todo {
  id: string;
  done: boolean;
  createdAt: number;
  updatedAt: number | null;
  value: string;
}

export type UpdatePayload = Omit<Partial<Todo>, 'id'>;

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

export const TodosProvider: React.FC = props => {
  const [filter, setFilter] = useState<Filter>('ALL');
  const [todoList, updateList] = useState<Todo[]>([]);

  function add(value: string) {
    updateList([
      {
        id: Date.now().toString(24),
        done: false,
        createdAt: Date.now(),
        updatedAt: null,
        value: value
      },
      ...todoList
    ]);
  }

  function remove(reqId: string) {
    updateList(todoList.filter(({ id }) => id !== reqId));
  }

  function update(reqId: string, payload: UpdatePayload) {
    updateList(
      todoList.map(todo => {
        if (todo.id === reqId) todo = { ...todo, ...payload };
        return todo;
      })
    );
  }

  function toggle(reqId: string) {
    updateList(
      todoList.map(todo => {
        if (todo.id === reqId) todo.done = !todo.done;
        return todo;
      })
    );
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
    <TodoContext.Provider value={contextValue}>
      {props.children}
    </TodoContext.Provider>
  );
};
