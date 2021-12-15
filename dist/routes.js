"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routes = void 0;

var _express = require("express");

var _UserController = _interopRequireDefault(require("./app/controllers/UserController"));

var _AuthController = _interopRequireDefault(require("./app/controllers/AuthController"));

var _ResultController = _interopRequireDefault(require("./app/controllers/ResultController"));

var _Authentication = _interopRequireDefault(require("./app/middlewares/Authentication"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)(); // => Authentication Routes

exports.routes = routes;
routes.post('/login', _AuthController.default.authenticate); // => User Routes

routes.get('/users', _Authentication.default.authenticate, _UserController.default.index);
routes.get('/users/:userId', _Authentication.default.authenticate, _UserController.default.show);
routes.post('/users', _UserController.default.store);
routes.post('/users/root', _UserController.default.store_root);
routes.put('/users/:userId', _Authentication.default.authenticate, _UserController.default.update);
routes.delete('/users/:userId', _Authentication.default.authenticate, _UserController.default.destroy); // => Result Routes

routes.get('/results', _Authentication.default.authenticate, _ResultController.default.index);
routes.get('/results/:resultId', _Authentication.default.authenticate, _ResultController.default.show);
routes.post('/results/', _Authentication.default.authenticate, _ResultController.default.store);
routes.put('/results/:resultId', _Authentication.default.authenticate, _ResultController.default.update);
routes.delete('/results/:resultId', _Authentication.default.authenticate, _ResultController.default.destroy); //450.676.466-83
//465.962.482-87