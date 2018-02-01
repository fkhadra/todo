
type func = () => void;

interface IEventEmitter {
  onChange(callback: func): IEventEmitter;
  on(event: string, callback: func): IEventEmitter;
  dispatch(event: string, ...payload: any): void;
};


export default class EventEmitter implements IEventEmitter {
  listeners: Map<string, Array<func>>= new Map();
  events = {
    ON_CHANGE: 'on_change'
  };
  
  onChange(cb: func): IEventEmitter {
    return this.on(this.events.ON_CHANGE, cb);
  }

  on(event: string, cb: func): IEventEmitter {
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
        .forEach((cb: func) => setTimeout(() => cb.call(this, ...payload), 0));
    }
  }
}
