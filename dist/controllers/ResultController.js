"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ResultController {
  async index(request, response) {
    const {
      user_id
    } = request;
    const {
      page,
      limit
    } = request.query;
    const user = await _User.default.findById(user_id);

    if (!user.root) {
      return response.status(403).send();
    }

    const results = await _User.default.find().sort('-createdAt').populate('user').limit(limit).skip((page - 1) * limit);
    return response.json(results);
  }

  async store(request, response) {
    const {
      user_id
    } = request;
    const {
      result
    } = request.body;
    const {
      id
    } = request.params;

    if (!result) {
      return response.status(400).send();
    }

    if (user_id !== id) {
      return response.status(403).send();
    }

    const user = await _User.default.findById(user_id);

    if (user.root) {
      return response.status(403).send();
    }

    await _User.default.create({
      user: id,
      result
    });
    return response.status(204).send();
  }

  async update(request, response) {
    const {
      user_id
    } = request;
    const {
      result
    } = request.body;
    const {
      id
    } = request.params;

    if (!result) {
      return response.status(400).send();
    }

    const user = await _User.default.findById(user_id);

    if (!user.root) {
      return response.status(403).send();
    }

    await _User.default.findByIdAndUpdate(id, {
      result
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
      page
    } = request.query;
    const {
      id
    } = request.params;
    const user = await _User.default.findById(user_id);

    if (!user.root) {
      return response.status(403).send();
    }

    const result = await _User.default.findById(id).populate('user');
    return response.json(result);
  }

}

var _default = new ResultController();

exports.default = _default;