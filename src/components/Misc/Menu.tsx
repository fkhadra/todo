import React, { useState, useEffect, SyntheticEvent } from 'react';
import styled from 'styled-components';

import { ellipsis } from '../../assets';

const Container = styled.div`
  margin: auto 10px;
  position: relative;
  display: inline-block;
  & > img {
    cursor: pointer;
  }
`;

const Content = styled.div<{ isOpen: boolean }>`
  z-index: 1;
  position: absolute;
  display: flex;
  opacity: ${props => (props.isOpen ? 1 : 0)};
  pointer-events: ${props => (props.isOpen ? 'initial' : 'none')};
  transition: opacity 0.275s;
  flex-direction: column;
  align-items: self-start;
  width: 230px;
  top: 40px;
  right: -66px;
  height: 170px;
  background: #24262b;
  color: #fff;
  border-radius: 0.4rem;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  &::before {
    content: '';
    height: 0px;
    position: absolute;
    width: 0px;
    border: 13px solid transparent;
    border-bottom-color: #24262b;
    right: 56px;
    top: -20px;
  }
`;

const Menu: React.FC = ({ children }) => {
  const [isOpen, setState] = useState(false);

  const close = () => {
    isOpen && setState(false);
  };

  useEffect(() => {
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);

  const toggle = (e: SyntheticEvent) => {
    e.nativeEvent.stopImmediatePropagation();
    setState(!isOpen);
  };

  const stopPropagation = (e: SyntheticEvent) =>
    e.nativeEvent.stopImmediatePropagation();

  return (
    <Container>
      <img src={ellipsis} alt="Menu" onClick={toggle} />
      <Content isOpen={isOpen} onClick={stopPropagation}>
        {children}
      </Content>
    </Container>
  );
};

export { Menu };
