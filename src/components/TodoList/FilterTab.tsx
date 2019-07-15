import React, { useRef, useState } from 'react';
import styled from 'styled-components';

import { listIcon, scheduleIcon, checkIcon } from '../../assets';
import { Filter } from '.';

const Nav = styled.nav`
  display: flex;
  position: relative;
  justify-content: space-between;
  & figure {
    margin: 0;
    padding: 0.8rem;
    transition: transform 0.4s;
  }
`;
const ActiveFilter = styled.div<{ position: number }>`
  position: absolute;
  height: 3px;
  width: 50px;
  bottom: 0;
  background: #ffffff;
  transform: ${props => `translateX(${props.position}px)`};
  transition: transform 0.4s;
`;

export interface FilterTabProps {
  onFilterChange: (filter: Filter) => void;
}

export const FilterTab: React.FC<FilterTabProps> = ({ onFilterChange }) => {
  const ref = useRef<HTMLElement>(null);
  const [position, setPosition] = useState(0);

  function handleNavigation(e: React.SyntheticEvent) {
    const ratio = ref.current!.offsetWidth / 3;
    const currentPosition = Number(e.currentTarget.getAttribute('data-idx'));
    setPosition((ratio + ratio / 2 - 25) * currentPosition);
    onFilterChange(e.currentTarget.getAttribute('data-filter') as Filter);
  }

  return (
    <Nav ref={ref}>
      <figure onClick={handleNavigation} data-filter="ALL" data-idx="0">
        <img src={listIcon} alt="list all" />
      </figure>
      <figure onClick={handleNavigation} data-filter="ACTIVE" data-idx="1">
        <img src={scheduleIcon} alt="todo" />
      </figure>
      <figure onClick={handleNavigation} data-filter="DONE" data-idx="2">
        <img src={checkIcon} alt="done" />
      </figure>
      <ActiveFilter position={position} />
    </Nav>
  );
};
