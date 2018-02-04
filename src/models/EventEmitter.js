export default class EventEmitter {
  observers = new Set();

  subscribe(cb) {
    this.observers.add(cb);
    return () => this.observers.delete(cb);
  }

  dispatch(...payload) {
    this.observers.forEach(cb =>
      setTimeout(() => cb.call(this, ...payload), 0)
    );
  }
}
