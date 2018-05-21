import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import { css } from "glamor";

const style = css({
  width: '360px',
  height: '300px',
  background: 'rgba(0,0,0,0.4)',
  borderRadius: '5px',
  margin: 'auto',
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
});

export default ({ authService }) => (
    <div {...style}>
      <h1>Login</h1>
      <StyledFirebaseAuth
        uiConfig={authService.uiConfig}
        firebaseAuth={authService}
      />
    </div>
);

