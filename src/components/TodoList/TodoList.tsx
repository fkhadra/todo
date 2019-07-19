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

const TodoList: React.FC = () => {

  return(
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
  )
}