import React from 'react';
import styled from 'styled-components';

import { AddTodo } from './AddTodo';
import { Footer } from './Footer';
import { TodosProvider } from '../../contexts';

import { FilterTab } from './FilterTab';
import { TodoList } from './TodoList';

const Container = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: auto;
  & header {
    display: flex;
    justify-content: center;
  }
  & main {
    flex: 1;
  }
`;

export const Todos: React.FC = () => {
  return (
    <TodosProvider>
      <Container>
        <header>
          <h1>To-Do</h1>
        </header>
        <AddTodo />
        <FilterTab />
        <TodoList />
        <Footer />
      </Container>
    </TodosProvider>
  );
};
