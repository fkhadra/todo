import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import { css } from "glamor";

const style = css({
});

export default ({ authService }) => (
    <div {...style}>
      <h1>Toodo</h1>
      <StyledFirebaseAuth
        uiConfig={authService.uiConfig}
        firebaseAuth={authService}
      />
    </div>
);

