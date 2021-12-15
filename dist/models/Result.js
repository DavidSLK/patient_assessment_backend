"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

const ResultSchema = new _mongoose.Schema({
  user: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  result: {
    type: Array(10),
    require: true
  }
}, {
  timestamps: true
});

var _default = (0, _mongoose.model)('Result', ResultSchema);

exports.default = _default;