import React, { useRef } from 'react';
import styled from 'styled-components';

import { Checkmark } from './Checkmark';
import { deleteIcon } from '../../assets';
import { useInput, useToggle } from '../../hooks';
import { useTodos, Todo } from '../../contexts';
import { keys } from '../../utils';

const Container = styled.article`
  display: flex;
  justify-items: center;
  justify-content: space-between;
  align-items: center;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  & img {
    opacity: 0.8;
    pointer-events: none;
  }
  &:hover {
    & img {
      opacity: 1;
      pointer-events: initial;
    }
  }
  & div {
    margin: 10px;
  }
  & input,
  & span {
    color: #ffffff;
    background: transparent;
    border: none;
    width: 100%;
    padding: 0.8rem 1rem;
    text-align: left;
  }
  & input:focus {
    outline: none;
    caret-color: #0cc10c;
  }
`;

const Content = styled.div<{ done: boolean }>`
  position: relative;
  opacity: ${props => (props.done ? 0.5 : 1)};
  width: 100%;
  text-align: left;
  &:after {
    content: '';
    position: absolute;
    display: block;
    width: 100%;
    height: 2px;
    top: 48%;
    border-radius: 1px;
    background: #cb3066;
    transform-origin: ${props => (props.done ? 'center left' : 'center right')};
    transform: ${props => (props.done ? 'scaleX(1)' : 'scaleX(0)')};
    transition: transform 0.5s cubic-bezier(0.55, 0, 0.1, 1);
  }
`;

const DeleteIcon = styled.img`
  &:hover {
    cursor: pointer;
  }
`;

export interface TodoProps {
  todo: Todo;
}

export const TodoItem: React.FC<TodoProps> = ({ todo }) => {
  const { isToggled, toggle } = useToggle(false);
  const { inputValue, onInputChange } = useInput(todo.value);
  const timeoutId = useRef<number>();
  const todos = useTodos();

  const toggleTodo = () => todos.toggle(todo.id);
  const removeTodo = () => todos.remove(todo.id);

  const handleSubmit = (e: React.KeyboardEvent | React.FocusEvent) => {
    if (
      inputValue.length &&
      ((e as React.KeyboardEvent).which === keys.ENTER || e.type === 'blur')
    ) {
      todos.update(todo.id, { value: inputValue });
      toggle();
    } else if ((e as React.KeyboardEvent).which === keys.ESCAPE) {
      toggle();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      timeoutId.current = setTimeout(() => toggle(), 400);
    }
  };

  const handleTouchEnd = () => clearTimeout(timeoutId.current);

  const { done } = todo;

  return (
    <Container>
      <div onClick={toggleTodo}>
        <Checkmark checked={done} />
      </div>
      {isToggled ? (
        <input
          type="text"
          value={inputValue}
          onChange={onInputChange}
          onKeyPress={handleSubmit}
          onBlur={handleSubmit}
          autoFocus
        />
      ) : (
        <Content
          done={done}
          onDoubleClick={toggle as any}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {todo.value}
        </Content>
      )}
      <div>
        <DeleteIcon src={deleteIcon} alt="delete" onClick={removeTodo} />
      </div>
    </Container>
  );
};
