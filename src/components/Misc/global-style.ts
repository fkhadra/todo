import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}

button:focus{
  outline: none;
}
html {
  background: #2c2f34;
  color: #ffffff;
  text-align: center;
  padding: 0 5%;
}

a{
  text-decoration: none;
}
a:visited, a{
  color: #ffffff;
}

.menu{
    position: absolute;
      width: 150px;
      top: 0px;
      right: 0;
      height: 200px;
      background: #fff;
      transform: scale(1);
      transform-origin: right top;
      transition: transform 0.4s;
      z-index: 0
}
h3{
  text-align: left;
}

@keyframes slideInLeft{
  from {
    transform: translate3d(-100%, 0, 0);
    opacity: 0;
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes zoomOut {
  from{
    opacity: 1;
  }
  50%{
    opacity: 0;
    transform: scale3d(.3,.3,.3);
  }
  to{
    opacity: 0;
  }
}

@keyframes fadeIn {
  from{opacity: 0}
  to {
    opacity: 1;
  } 
}

.todo-enter{
  animation-fill-mode: both;
  animation: slideInLeft 0.35s;
}

.todo-exit {
  animation-fill-mode: both;
  animation: zoomOut 0.35s;
  transition: max-height 0.75s, opacity 0.75s, padding 0.75s;
  overflow: hidden;
}
`;
