import React, { Component } from 'react';
import Icon from '@fortawesome/react-fontawesome';
import { css } from 'glamor';
import styles from './styles';

class Header extends Component {
  state = {
    isProfileOpen: false
  };

  toggleProfile = () =>
    this.setState({ isProfileOpen: !this.state.isProfileOpen });

  render() {
    const { toggleSidebar, user, isSidebarOpen } = this.props;
    const { isProfileOpen } = this.state;

    return (
      <header {...styles.header}>
        <nav>
          <div
            {...styles.sidebarTrigger(isSidebarOpen)}
            onClick={toggleSidebar}
            role="button"
          >
            <span />
          </div>
          <span>Navigation</span>
          <div {...css({ margin: 'auto 0 auto auto', position: 'relative' })}>
            {user.photoUrl ? (
              <img
                {...css({ width: '32px', position: 'relative', zIndex: 1 })}
                src={user.photoUrl}
                alt="profile-pic"
                onClick={this.toggleProfile}
              />
            ) : (
              <Icon
                icon="user"
                {...css({ width: '32px', position: 'relative', zIndex: 1 })}
                onClick={this.toggleProfile}
              />
            )}
            <div
              {...css({
                position: 'absolute',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'self-start',
                width: '175px',
                top: '0px',
                right: '0',
                height: '200px',
                background: '#fff',
                transform: isProfileOpen ? 'scale(1)' : 'scale(0)',
                transformOrigin: 'right top',
                transition: 'transform 0.4s',
                color: "#000",
                boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
              })}
            >
            { user.displayName && <span>{user.displayName}</span> }
              <ul>
                <li>foo</li>
                <li>bar</li>
                <li>bar</li>
              </ul>
            </div>
          </div>
          {/* <button onClick={store.signOut}>Sign Out</button> */}
        </nav>
      </header>
    );
  }
}

export default Header;
