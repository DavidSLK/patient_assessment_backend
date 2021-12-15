"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;

var _typeorm = require("typeorm");

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _BaseEntity = require("./BaseEntity");

var _Result = require("./Result");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

let User = (_dec = (0, _typeorm.Entity)('users'), _dec2 = (0, _typeorm.Column)({
  type: 'varchar',
  nullable: false,
  name: 'fullname'
}), _dec3 = (0, _typeorm.Column)({
  type: 'varchar',
  unique: true,
  nullable: false,
  name: 'document'
}), _dec4 = (0, _typeorm.Column)({
  type: 'varchar',
  unique: true,
  nullable: false,
  name: 'email'
}), _dec5 = (0, _typeorm.Column)({
  type: 'varchar',
  nullable: false,
  name: 'password'
}), _dec6 = (0, _typeorm.Column)({
  type: 'date',
  nullable: false,
  name: 'birth_date'
}), _dec7 = (0, _typeorm.Column)({
  type: 'varchar',
  nullable: false,
  default: false,
  name: 'isRootUser'
}), _dec8 = (0, _typeorm.OneToMany)(() => _Result.Result, result => result.user), _dec9 = (0, _typeorm.BeforeInsert)(), _dec10 = (0, _typeorm.BeforeUpdate)(), _dec(_class = (_class2 = class User extends _BaseEntity.BaseEntity {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "fullname", _descriptor, this);

    _initializerDefineProperty(this, "document", _descriptor2, this);

    _initializerDefineProperty(this, "email", _descriptor3, this);

    _initializerDefineProperty(this, "password", _descriptor4, this);

    _initializerDefineProperty(this, "birth_date", _descriptor5, this);

    _initializerDefineProperty(this, "isRootUser", _descriptor6, this);

    _initializerDefineProperty(this, "results", _descriptor7, this);
  }

  hashData() {
    this.password = _bcrypt.default.hashSync(this.password, 8);
  }

}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "fullname", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "document", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "email", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "password", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "birth_date", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "isRootUser", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "results", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "hashData", [_dec9, _dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "hashData"), _class2.prototype)), _class2)) || _class);
exports.User = User;