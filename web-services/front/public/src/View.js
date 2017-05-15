const { qs, $on, $delegate } = require('./helpers');

const _itemId = element => {
  const val = element.parentNode.dataset.id;
  const id = val === '' ? null : parseInt(val, 10);

  return id;
};

const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

class View {
  /**
   * @param {!Template} template A Template instance
   */
  constructor(template) {
    this.template = template;
    this.$container = qs('#container');

    $delegate(this.$container, 'form', 'submit', e => e.preventDefault());
    $delegate(this.$container, 'form .save', 'click', ({ target }) => this.saveItem(target));
    $delegate(this.$container, 'form .create', 'click', ({ target }) => this.saveItem(target));
    $delegate(this.$container, 'form .delete', 'click', ({ target }) => this.deleteItem(target));
    $delegate(this.$container, 'form .apply', 'click', ({ target }) => this.applyItem(target));
  }

  getData(target) {
    const $form = target.parentNode;
    const id = _itemId(target);

    return {
      rowid: id,
      SSID: qs('input[name=SSID]', $form).value,
      key_mgmt: qs('input[name=key_mgmt]:checked', $form).value,
      passwd: qs('input[name=passwd]', $form).value,
      type: qs('input[name=type]:checked', $form).value,
      address: qs('input[name=address]', $form).value,
      netmask: qs('input[name=netmask]', $form).value,
      gateway: qs('input[name=gateway]', $form).value,
    };
  }

  showItems(items, defaultItem) {
    const html = '<ul>' + this.template.networkItemList(items, defaultItem) + '</ul>';
    this.$container.innerHTML = html;
  }

  saveItem(target) {
    const data = this.getData(target);
    this._saveItemHandler(data);
  }

  deleteItem(target) {
    const id = _itemId(target);
    this._deleteItemHandler(id);
  }

  applyItem(target) {
    const data = this.getData(target);
    this._applyItemHandler(data);
  }

  // bind controller handlers
  bindSaveItemHandler(handler) {
    this._saveItemHandler = handler;
  }

  bindDeleteItemHandler(handler) {
    this._deleteItemHandler = handler;
  }

  bindApplyItemHandler(handler) {
    this._applyItemHandler = handler;
  }
}

module.exports = View;
