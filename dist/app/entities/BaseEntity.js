"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseEntity = void 0;

var _typeorm = require("typeorm");

var _uuid = require("uuid");

var _dec, _dec2, _dec3, _class, _descriptor, _descriptor2, _descriptor3;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

let BaseEntity = (_dec = (0, _typeorm.PrimaryColumn)({
  type: 'varchar',
  nullable: false,
  name: 'id'
}), _dec2 = (0, _typeorm.CreateDateColumn)({
  type: 'timestamp',
  nullable: false,
  name: 'created_at'
}), _dec3 = (0, _typeorm.UpdateDateColumn)({
  type: 'timestamp',
  nullable: false,
  name: 'updated_at'
}), (_class = class BaseEntity {
  constructor() {
    _initializerDefineProperty(this, "id", _descriptor, this);

    _initializerDefineProperty(this, "created_at", _descriptor2, this);

    _initializerDefineProperty(this, "updated_at", _descriptor3, this);

    if (!this.id) {
      this.id = (0, _uuid.v4)();
    }
  }

}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "id", [_dec], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "created_at", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "updated_at", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class));
exports.BaseEntity = BaseEntity;