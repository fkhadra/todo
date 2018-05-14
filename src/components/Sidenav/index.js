import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';

import List from './List';
import StoreFetcher from 'src/components/StoreFetcher';
import Icon from '@fortawesome/react-fontawesome';

const Sidenav = ({ store, toggleSidebar }) => {
  const newTodoListId = store.genTodoListId();
  const createNewTodoList = () => {
    store.addUserList(newTodoListId);
    toggleSidebar();
  };
  return (
    <nav>
      <NavLink onClick={createNewTodoList} to={`/list/${newTodoListId}`}>
        {/* <img src={addListIcon} alt="Add list" /> */}
        <Icon icon="plus-square" />
        <span>Create new List</span>
      </NavLink>
      <StoreFetcher fetch={store.fetchUserList}>
        <List
          title="Owned"
          list={store.userList}
          onListSelect={toggleSidebar}
        />
        {/* <List title="Shared" list={store.sharedList} onListSelect={toggleSidebar} /> */}
      </StoreFetcher>
    </nav>
  );
};

export default withRouter(observer(Sidenav));
