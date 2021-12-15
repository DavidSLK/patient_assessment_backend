"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _User = _interopRequireDefault(require("../models/User"));

var _isCPF = _interopRequireDefault(require("../utils/isCPF"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserController {
  async index(request, response) {
    const {
      user_id
    } = request;
    const {
      page
    } = request.query;
    const user = await _User.default.findById(user_id);

    if (!user.root) {
      return response.status(403).send();
    }

    const users = await _User.default.find().limit(10).skip((page - 1) * 10);
    return response.json(users);
  }

  async store(request, response) {
    const {
      fullname,
      document,
      email,
      password,
      birth_day
    } = request.body;

    if (!fullname || !document || !email || !password || !birth_day) {
      return response.status(400).send();
    }

    if (!(await (0, _isCPF.default)(document))) {
      return response.status(400).send();
    }

    try {
      const root_user = await _User.default.findOne().where({
        root: true
      });
      await _User.default.create({
        fullname,
        document,
        email,
        password,
        birth_day,
        root: true
      });
      return response.status(204).send();
    } catch {
      await _User.default.create({
        fullname,
        document,
        email,
        password,
        birth_day,
        root: false
      });
      return response.status(204).send();
    }
  }

  async update(request, response) {
    const {
      user_id
    } = request;
    const {
      fullname,
      document,
      email,
      password,
      birth_day
    } = request.body;
    const {
      id
    } = request.params;

    if (!fullname || !document || !email || !password || !birth_day) {
      return response.status(400).send();
    }

    if (!(await (0, _isCPF.default)(document))) {
      return response.status(400).send();
    }

    const user = await _User.default.findById(user_id);

    if (!user.root) {
      return response.status(403).send();
    }

    await _User.default.findByIdAndUpdate(id, {
      fullname,
      document,
      email,
      password,
      birth_day
    });
    return response.status(204).send();
  }

  async destroy(request, response) {
    const {
      user_id
    } = request;
    const {
      id
    } = request.params;
    const user = await _User.default.findById(user_id);

    if (!user.root) {
      return response.status(403).send();
    }

    await _User.default.findByIdAndDelete(id);
    return response.status(204).send();
  }

  async show(request, response) {
    const {
      user_id
    } = request;
    const {
      id
    } = request.params;
    const user = await _User.default.findById(user_id);

    if (!user.root) {
      return response.status(403).send();
    }

    return response.json(await _User.default.findById(id));
  }

}

var _default = new UserController();

exports.default = _default;