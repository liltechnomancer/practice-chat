"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var escapeHtml = function escapeHtml(string) {
  var map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
    "`": "&#96;"
  };
  return string.replace(/[&<>"'`]/g, function (t) {
    return map[t];
  });
};

exports.default = escapeHtml;