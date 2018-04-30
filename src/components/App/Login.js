import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import { css } from "glamor";

const style = css({
  background: '#fff',
  border: '1px solid'
});

export default ({ authService }) => (
    <div {...style}>
      <h1>My App</h1>
      <p>Please sign-in:</p>
      <StyledFirebaseAuth
        uiConfig={authService.uiConfig}
        firebaseAuth={authService}
      />
    </div>
);

