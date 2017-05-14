export default {
  set(key, value) {
    return window.localStorage.setItem(key, value);
  },
  get(key) {
    return window.localStorage.getItem(key);
  },
  clear() {
    window.localStorage.clear();
  }
}
