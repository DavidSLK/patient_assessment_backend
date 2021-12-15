"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var jwt = _interopRequireWildcard(require("jsonwebtoken"));

var bcrypt = _interopRequireWildcard(require("bcryptjs"));

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class AuthController {
  async signIn(request, response) {
    const {
      document,
      password
    } = request.body;

    try {
      const user = await _User.default.findOne({
        document
      });

      if (!(await bcrypt.compareSync(password, user.password))) {
        return response.status(401).send();
      }

      const token = jwt.sign({
        id: user.id
      }, process.env.JWT_SECRET_KEY, {
        expiresIn: 86400
      });
      return response.json({
        token
      });
    } catch {
      return response.status(404).send();
    }
  }

  async auth(request, response, next) {
    const {
      authorization
    } = request.headers;
    if (!authorization) return response.status(401).json({
      failure: 'No token provided'
    });
    const token = authorization.replace('Bearer', '').trim();

    try {
      const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const {
        id
      } = data;
      request.user_id = id;
      return next();
    } catch (err) {
      return response.status(401).json({
        failure: 'No token provided'
      });
    }
  }

}

var _default = new AuthController();

exports.default = _default;