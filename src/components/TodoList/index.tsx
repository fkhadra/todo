import React, { useState } from 'react';
import styled from 'styled-components';
import { TransitionGroup, Transition } from 'react-transition-group';

import { AddTodo } from './AddTodo';
import { TodoItem } from './TodoItem';
import { Footer } from './Footer';
import { useTodos, Todo } from '../../contexts';

//import { Spinner } from "../Misc";
import { FilterTab } from './FilterTab';
import { transition } from './todoTransition';

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

const applyFilter = {
  ALL: (_todo: Todo) => true,
  ACTIVE: (todo: Todo) => !todo.done,
  DONE: (todo: Todo) => todo.done
};

const StyledTransition = styled(TransitionGroup)`
  list-style: none;
  overflow: hidden;
  padding: 0;
  & li {
    padding: 5px 0;
  }
`;
export type Filter = keyof typeof applyFilter;

export const TodoList: React.FC = () => {
  const [filter, setFilter] = useState<Filter>('ALL');
  const { todos } = useTodos();

  function onFilterChange(filter: Filter) {
    setFilter(filter);
  }

  return (
    <Container>
      <header>
        <h1>To-Do</h1>
      </header>
      <AddTodo />
      <FilterTab onFilterChange={onFilterChange} />
      <main>
        <StyledTransition component="ul">
          {todos.filter(applyFilter[filter]).map(todo => (
            <Transition
              key={todo.id}
              timeout={750}
              onEnter={transition.onEnter}
              onEntered={transition.onEntered}
              onExit={transition.onExit}
            >
              <li>
                <TodoItem todo={todo} />
              </li>
            </Transition>
          ))}
        </StyledTransition>
      </main>
      <Footer />
    </Container>
  );
};
