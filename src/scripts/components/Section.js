class Section {
  constructor({ items, renderer }, container) {
    this._initialArray = items;
    this._renderer = renderer;
    this._container = document.querySelector(container);
  }

  renderer() {
    this._initialArray.forEach((item) => this._renderer(item));
  }
  addItem(element) {
    this._container.append(element);
  }
  prepend(element) {
    this._container.prepend(element);
  }
}

export default Section;
