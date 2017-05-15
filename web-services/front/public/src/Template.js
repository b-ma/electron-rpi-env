const { escapeForHTML } = require('./helpers');
const lodashTemplate = require('lodash-template');

class Template {
  constructor() {
    this._networkTemplate = lodashTemplate(`
      <li>
        <form data-id="<%= rowid %>">
          <label>
            SSID:
            <input type="text" name="SSID" value="<%= SSID %>">
          </label>
          <label>
            <label class="inline"><input type="radio" name="key_mgmt" value="OPEN"<%= key_mgmt === 'OPEN' ? ' checked': '' %> /> OPEN</label>
            <label class="inline"><input type="radio" name="key_mgmt" value="WEP"<%= key_mgmt === 'WEP' ? ' checked': '' %> /> WEP</label>
            <label class="inline"><input type="radio" name="key_mgmt" value="WPA/WPA2"<%= key_mgmt === 'WPA/WPA2' ? ' checked': '' %> /> WPA/WPA2</label>
          </label>
          <label>
            Password:
            <input type="text" name="passwd" value="<%= passwd %>" />
          </label>
          <label>
            Type:
            <label class="inline"><input type="radio" name="type" value="static"<%= type === 'static' ? ' checked': '' %> /> static</label>
            <label class="inline"><input type="radio" name="type" value="dhcp"<%= type === 'dhcp' ? ' checked': '' %> /> dhcp</label>
          </label>

          <label>
            Address:
            <input type="text" name="address" value="<%= address %>">
          </label>
          <label>
            Netmask:
            <input type="text" name="netmask" value="<%= netmask %>" placeholder="255.255.255.0" />
          </label>
          <label>
            Gateway:
            <input type="text" name="gateway" value="<%= gateway %>" placeholder="192.168.1.1" />
          </label>

          <% if (rowid !== null) { %>
            <button class="save">Save</button>
            <button class="delete">Delete</button>
            <button class="apply">Apply</button>
          <% } else { %>
            <button class="create">Create</button>
          <% } %>
         </form>
      </li>
    `);
  }

  networkItem(item) {
    return this._networkTemplate(item);
  }

  networkItemList(items, defaultItem) {
    let html = '';
    html += items.reduce((a, item) => a + this.networkItem(item), '');
    html += this.networkItem(defaultItem);

    return html;
  }



  // itemCounter(activeTodos) {
  //  return `<%= activeTodos} item<%= activeTodos !== 1 ? 's' : ''} left`;
  // }
}

module.exports = Template;
