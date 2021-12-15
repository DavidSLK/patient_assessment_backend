"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Authentication {
  async authenticate(request, response, next) {
    const {
      authorization
    } = request.headers;

    if (!authorization) {
      return response.status(401).json({
        failure: 'No token provided'
      });
    }

    const token = authorization.replace('Bearer', '').trim();

    try {
      const data = _jsonwebtoken.default.verify(token, process.env.JWT_SECRET_KEY);

      const {
        id
      } = data;
      request.userId = id;
      return next();
    } catch (err) {
      return response.status(401).json({
        failure: 'No token provided'
      });
    }
  }

}

var _default = new Authentication();

exports.default = _default;