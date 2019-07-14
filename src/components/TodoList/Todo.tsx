import React, { useState, useRef } from 'react';
import styled from 'styled-components';

import { Checkmark } from './Checkmark';
import { deleteIcon } from '../../assets';
import { Todo, useTodos } from '../../hooks';
import { Input } from '../Misc';

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

export interface TodoProps {
  todo: Todo;
}

export const TodoInput: React.FC<TodoProps> = ({ todo }) => {
  const [isActive, toggleState] = useState(false);
  const timeoutId = useRef<number>();
  const todos = useTodos();

  const toggle = () => todos.toggle(todo.id);
  const remove = () => todos.remove(todo.id);
  const toggleEdit = () => toggleState(!isActive);
  const handleSubmit = (value: string, addTodo: boolean) => {
    if (addTodo) todos.update(todo.id, { value });
    toggleEdit();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      timeoutId.current = setTimeout(() => toggleEdit(), 400);
    }
  };

  const handleTouchEnd = () => clearTimeout(timeoutId.current);

  const { done, value } = todo;

  return (
    <Container>
      <div onClick={toggle}>
        <Checkmark checked={done} />
      </div>
      {isActive ? (
        <Input onSubmit={handleSubmit} initialValue={value} />
      ) : (
        <Content
          done={done}
          onDoubleClick={toggleEdit}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {value}
        </Content>
      )}
      <div>
        <img src={deleteIcon} alt="delete" onClick={remove} />
      </div>
    </Container>
  );
};
