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
  todos: Todo[];
  add: (value: string) => void;
  remove: (id: string) => void;
  toggle: (id: string) => void;
  update: (id: string, payload: UpdatePayload) => void;
}

const TodoContext = createContext<UseTodos>({} as UseTodos);

export const useTodos = () => useContext(TodoContext);

export const TodosProvider: React.FC = props => {
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

  const contextValue = {
    todos: todoList,
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
