export default class Timer {
  constructor() {
    this.start = 0;
    this.end = 0;
    this.isActive = false;
  }

  getDelta() {
    return this.end - this.start;
  }

  setStart() {
    this.start = Date.now();
  }

  setEnd() {
    this.end = Date.now();
  }
}
