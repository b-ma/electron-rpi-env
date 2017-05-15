class Controller {
  /**
   * @param  {!Store} store A Store instance
   * @param  {!View} view A View instance
   */
  constructor(store, view) {
    this.store = store;
    this.view = view;

    this.setView = this.setView.bind(this);
    this.saveItem = this.saveItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.applyItem = this.applyItem.bind(this);

    view.bindSaveItemHandler(this.saveItem);
    view.bindDeleteItemHandler(this.deleteItem);
    view.bindApplyItemHandler(this.applyItem);

    // this._activeRoute = '';
    // this._lastActiveRoute = null;
  }

  /**
   * Set and render the active route.
   * @param {string} raw '' | '#/' | '#/active' | '#/completed'
   */
  setView(raw) {
    // const route = raw.replace(/^#\//, '');
    // this._activeRoute = route;
    // this._filter();
    // this.view.updateFilterButtons(route);
    return this.store.all()
      .then(items => this.view.showItems(items, this.store.defaultItem))
      .catch(err => console.error(err.stack));
  }

  saveItem(item) {
    let promise;

    if (item.rowid === null)
      promise = this.store.insert(item);
    else
      promise = this.store.update(item);

    return promise
      .then(this.setView)
      .catch(err => console.error(err.stack));
  }

  deleteItem(id) {
    this.store.delete(id)
      .then(this.setView)
      .catch(err => console.error(err.stack));
  }

  applyItem(item) {
    console.log(item);
    // const confirm = window.confirm('Are you sure want to update WiFi settings ? (you might loose the connection');
    const confirm = true;

    if (confirm) {
      this.store.update(item)
        .then(() => this.store.apply(item.rowid))
        .catch(err => console.error(err.stack));
    }

  }
}

module.exports = Controller;
