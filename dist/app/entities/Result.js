"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Result = void 0;

var _typeorm = require("typeorm");

var _BaseEntity = require("./BaseEntity");

var _User = require("./User");

var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

let Result = (_dec = (0, _typeorm.Entity)('results'), _dec2 = (0, _typeorm.Column)({
  type: 'text',
  nullable: false,
  name: 'answers'
}), _dec3 = (0, _typeorm.ManyToOne)(() => _User.User, user => user.results, {
  onDelete: 'CASCADE'
}), _dec(_class = (_class2 = class Result extends _BaseEntity.BaseEntity {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "answers", _descriptor, this);

    _initializerDefineProperty(this, "user", _descriptor2, this);
  }

}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "answers", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "user", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
exports.Result = Result;