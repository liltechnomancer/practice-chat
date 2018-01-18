'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const escapeHtml = string => {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
    '`': '&#96;'
  };
  return string.replace(/[&<>"'`]/g, t => map[t]);
};

exports.default = escapeHtml;