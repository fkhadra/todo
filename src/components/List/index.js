import React from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react';

import addListIcon from 'src/assets/add-list.svg';
import listIcon from 'src/assets/list.svg';
import styles from './styles';

const List = ({ store, toggleSidebar }) => {
  const newTodoListId = store.genTodoListId();
  const createNewTodoList = () => {
    store.addUserList(newTodoListId);
    toggleSidebar();
  };

  return (
    <nav>
      <ul {...styles.list}>
        {Array.from(store.userList.values()).map(({ id, label }) => (
          <li key={id}>
            <NavLink onClick={toggleSidebar} to={`/list/${id}`}>
              <img src={listIcon} alt="List" />
              <span>{label}</span>
            </NavLink>
          </li>
        ))}
        <li>
          <NavLink onClick={createNewTodoList} to={`/list/${newTodoListId}`}>
            <img src={addListIcon} alt="Add list" />
            <span>Create new List</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default observer(List);
