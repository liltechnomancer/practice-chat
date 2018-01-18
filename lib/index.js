'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _micro = require('micro');

var _micro2 = _interopRequireDefault(_micro);

var _ws = require('ws');

var _ws2 = _interopRequireDefault(_ws);

var _wss = require('./wss');

var _wss2 = _interopRequireDefault(_wss);

var _rooms = require('./rooms');

var _ramda = require('ramda');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
// import escapeHtml from './utils/escape-html'


const server = (0, _micro2.default)((() => {
  var _ref = _asyncToGenerator(function* (req, res) {});

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})());
const wss = new _ws2.default.Server({
  server
});

(0, _wss2.default)(wss);
server.listen(3000);
module.exports = () => 'Hello, friend.';