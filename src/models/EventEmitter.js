export default class EventEmitter {
  listeners = new Map();
  events = {
    ON_CHANGE: 'on_change'
  };

  on(event, cb) {
    this.listeners.has(event) || this.listeners.set(event, []);
    this.listeners.get(event).push(cb);
    return this;
  }

  dispatch(event, ...payload) {
    if (this.listeners.has(event)) {
      this.listeners
        .get(event)
        .forEach(cb => setTimeout(() => cb.call(this, ...payload), 0));
    }
  }
}
