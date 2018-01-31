/* @flow */

type func = () => void;

export default class EventEmitter {
  listeners: Map<string, Array<func>>= new Map();
  events = {
    ON_CHANGE: 'on_change'
  };
  
  onChange(cb: func) {
    return this.on(this.events.ON_CHANGE, cb);
  }

  on(event: string, cb: func) {
    this.listeners.has(event) || this.listeners.set(event, []);
    // $FlowFixMe
    this.listeners.get(event).push(cb);
    return this;
  }

  dispatch(event: string, ...payload:any): void {
    if (this.listeners.has(event)) {
      // $FlowFixMe
      this.listeners
        .get(event)
        .forEach(cb => setTimeout(() => cb.call(this, ...payload), 0));
    }
  }
}
