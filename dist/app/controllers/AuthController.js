"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _typeorm = require("typeorm");

var _User = require("../entities/User");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AuthController {
  async authenticate(request, response) {
    const repository = (0, _typeorm.getRepository)(_User.User);
    const {
      document,
      password
    } = request.body;
    console.log(document, password);

    try {
      const user = await repository.findOne({
        where: {
          document
        }
      });

      if (!_bcryptjs.default.compareSync(password, user.password)) {
        return response.status(401).json({
          warning: "You're not allowed to access the system"
        });
      }

      try {
        const token = _jsonwebtoken.default.sign({
          id: user.id
        }, process.env.JWT_SECRET_KEY, {
          expiresIn: 86400 // 1 day or 24 hours or 1440 minutes or 86400 secounds

        });

        delete user.document;
        delete user.password;
        return response.json({
          success: 'Token successfully generated',
          user,
          token
        });
      } catch (err) {
        return response.json({
          failure: 'could not generate token',
          err: err
        });
      }
    } catch (err) {
      return response.status(404).json({
        failure: 'user not found'
      });
    }
  }

}

var _default = new AuthController();

exports.default = _default;