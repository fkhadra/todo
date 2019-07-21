import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import styled from 'styled-components';

import { uiConfig, firebaseAuth } from '../../firebase';

const Container = styled.div`
  width: 360px;
  height: 300px;
  background: rgba(0,0,0,0.4);
  border-radius: 5px;
  margin: auto;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`

export const Login: React.FC = () => (
  <Container>
    <h1>Login</h1>
      <StyledFirebaseAuth
        uiConfig={uiConfig}
        firebaseAuth={firebaseAuth}
      />
  </Container>
)

export default Login;
