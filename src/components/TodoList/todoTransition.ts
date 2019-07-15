
export const transition = {
  onEnter: (node: HTMLElement) => node.classList.add('todo-enter'),
  onEntered: (node: HTMLElement) => node.classList.remove('todo-enter'),
  onExit(node: HTMLElement){
    node.classList.add('todo-exit');
    node.style.maxHeight = `${node.offsetHeight}px`;
    requestAnimationFrame(() => {
      setTimeout(() => {
        node.style.maxHeight = '0';
        node.style.opacity = '0';
        node.style.padding = '0';
      }, 0);
    });
  }
}