import React from 'react';
import styled from 'styled-components';
import { TransitionGroup, Transition } from 'react-transition-group';

import { TodoItem } from './TodoItem';
import { useTodos } from '../../contexts';

import { transition } from './todoTransition';

const StyledTransition = styled(TransitionGroup)`
  list-style: none;
  overflow: hidden;
  padding: 0;
  & li {
    padding: 5px 0;
  }
`;

export const TodoList: React.FC = () => {
  const { list } = useTodos();
  return (
    <main>
      <StyledTransition component="ul">
        {list().map(todo => (
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
  );
};
