const Controller = require('./Controller');
const { $on } = require('./helpers');
const Template = require('./Template');
const Store = require('./Store');
const View = require('./View');

const store = new Store('/api/db/network');
const template = new Template();
const view = new View(template);
const controller = new Controller(store, view);

const setView = () => controller.setView(document.location.hash);
$on(window, 'load', setView);
$on(window, 'hashchange', setView);
