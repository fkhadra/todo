import React from 'react';
import styled from 'styled-components';

import { editIcon, clearIcon } from '../../assets';
import { useTodos } from '../../contexts';
import { useInput } from '../../hooks';
import { keys } from '../../utils';

const Form = styled.form`
  position: relative;
  box-sizing: border-box;
  & input {
    font-size: 100%;
    margin-bottom: 1.5rem;
    width: 100%;
    appearance: none;
    background-color: #6d6e70;
    border: none;
    border-radius: 0.4rem;
    box-shadow: none;
    box-sizing: inherit;
    height: 2.8rem;
    color: #ffffff;
    caret-color: #0cc10c;
    padding: 0.6rem 1rem;
    transition: transform 0.4s;
    &:focus {
      outline: none;
    }
    &::placeholder {
      color: #a0a0a0;
    }
  }
`;

const Icon = styled.img<{ clear: boolean }>`
  position: absolute;
  right: 2%;
  top: ${props => (props.clear ? '18%' : '14%')};
`;

export const AddTodo: React.FC = () => {
  const { inputValue, onInputChange, clearInput } = useInput('');
  const { add } = useTodos();

  function onSubmit(e: React.KeyboardEvent | React.FocusEvent){
    if (
      inputValue.length &&
      ((e as React.KeyboardEvent).which === keys.ENTER || e.type === 'blur')
    ) {
      add(inputValue);
      (e.target as HTMLElement).blur();
      clearInput();
    } else if ((e as React.KeyboardEvent).which === keys.ESCAPE) {
      (e.target as HTMLElement).blur();
      clearInput();
    }
  };

  return (
    <Form action="#" onSubmit={e => e.preventDefault()}>
      <input
        type="text"
        value={inputValue}
        placeholder="What need to be done ?"
        onChange={onInputChange}
        onKeyPress={onSubmit}
      />
      {inputValue.length ? (
        <Icon clear src={clearIcon} alt="input" onClick={clearInput} />
      ) : (
        <Icon clear={false} src={editIcon} alt="input" />
      )}
    </Form>
  );
};
