import React from 'react';
import styled, { keyframes } from 'styled-components';

import { AddTodo } from './AddTodo';
import { Footer } from './Footer';
import { TodosProvider, useAuth } from '../../contexts';

import { FilterTab } from './FilterTab';
import { TodoList } from './TodoList';
import { Menu } from '../Misc';
import { FirebaseAuth } from 'react-firebaseui';

const Container = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: auto;
  animation: fadeIn .365s;
  & header {
    display: flex;
    justify-content: center;
  }
  & main {
    flex: 1;
  }
`;

export const Todos: React.FC = () => {
  const { getAvatar, getName, signOut } = useAuth();
  return (
    <TodosProvider>
      <Container>
        <header>
          <h1>To-Do</h1>
          <Menu>
              <div>
                <img src={getAvatar()} alt="profile" />
                <span>{getName()}</span>
              </div>
              <div><a href="#" onClick={signOut}>Sign Out</a></div>
          </Menu>
        </header>
        <AddTodo />
        <FilterTab />
        <TodoList />
        <Footer />
      </Container>
    </TodosProvider>
  );
};

export default Todos;
