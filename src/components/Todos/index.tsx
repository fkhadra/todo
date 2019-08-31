import React from 'react';
import styled from 'styled-components';

import { AddTodo } from './AddTodo';
import { Footer } from './Footer';
import { TodosProvider, useAuth } from '../../contexts';

import { FilterTab } from './FilterTab';
import { TodoList } from './TodoList';
import { Menu } from '../Misc';

const Container = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: auto;
  animation: fadeIn 0.365s;
  & header {
    display: flex;
    justify-content: center;
  }
  & main {
    flex: 1;
  }
`;

const Signout = styled.button`
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
`;

export const Todos: React.FC = () => {
  const { user, signOut } = useAuth();
  return (
    <TodosProvider user={user}>
      <Container>
        <header>
          <h1>To-Do</h1>
          <Menu>
            <div>
              <img src={user.avatar} alt="profile" />
              <span>{user.name}</span>
            </div>
            <div>
              <Signout onClick={signOut}>Sign out</Signout>
            </div>
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
