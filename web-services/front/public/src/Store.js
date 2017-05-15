// const { Item, ItemList, ItemQuery, ItemUpdate, emptyItemQuery } = require('./item');
const rest = require('rest/browser');
const mime = require('rest/interceptor/mime');
const errorCode = require('rest/interceptor/errorCode');

const client = rest
  .wrap(mime)
  .wrap(errorCode, { code: 500 });

class Store {
  constructor(path) {
    this.path = path;

    this.defaultItem = {
      rowid: null,
      SSID: '',
      passwd: '',
      key_mgmt: 'OPEN',
      type: 'dhcp',
      address: '',
      netmask: '',
      gateway: '',
    };
  }

  all() {
    return client({
      method: 'GET',
      path: this.path,
    }).then(
      res => { return Promise.resolve(res.entity) },
      res => console.error('res error: ', res),
    );
  }

  /**
   * Insert an item into the Store.
   * @param {Object} item - Item to insert
   */
  insert(item) {
    return client({
      method: 'POST',
      path: this.path,
      entity: item,
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => {
      return Promise.resolve(res.entity);
    });
  }

  /**
   * Update an item in the Store.
   * @param {Object} item - Item to insert
   */
  update(item) {
    return client({
      method: 'PUT',
      path: this.path + '/' + item.rowid,
      entity: item,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  /**
   * Remove items from the Store based on a query.
   * @param {Number} id - Id of the item to delete
   */
  delete(id) {
    return client({
      method: 'DELETE',
      path: this.path + '/' + id,
    });
  }

  /**
   * Apply the given configuration
   * @param {Number} id - Id of the item to apply
   */
  apply(id) {
    return client({
      method: 'POST',
      path: '/api/config/network/' + id,
    });
  }
}

module.exports = Store;
