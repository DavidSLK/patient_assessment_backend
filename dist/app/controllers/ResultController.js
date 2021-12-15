"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Result = require("../entities/Result");

var _User = require("../entities/User");

class ResultController {
  async index(request, response) {
    const repository = (0, _typeorm.getRepository)(_Result.Result);
    const {
      page
    } = request.query;

    try {
      const results = await repository.find({
        order: {
          updated_at: 'ASC'
        },
        take: 10,
        skip: (page - 1) * 10
      });

      if (results) {
        results.map(result => result.answers = JSON.parse(result.answers));
      }

      return response.status(200).json({
        results
      });
    } catch (error) {
      return response.status(400).json({
        failure: error
      });
    }
  }

  async show(request, response) {
    const repository = (0, _typeorm.getRepository)(_Result.Result);
    const {
      resultId
    } = request.params;
    const result = await repository.findOne(resultId);

    if (result) {
      result.answers = JSON.parse(result.answers);
    }

    return response.status(200).json({
      result,
      user_id: request.userId
    });
  }

  async store(request, response) {
    const resultRepository = (0, _typeorm.getRepository)(_Result.Result);
    const userRepository = (0, _typeorm.getRepository)(_User.User);
    const {
      userId
    } = request;
    const {
      answers
    } = request.body;
    const user = await userRepository.findOne(userId);
    const result = resultRepository.create({
      answers: JSON.stringify(answers),
      user
    });
    await resultRepository.save(result);
    return response.status(200).json({
      success: 'successfully registered result'
    });
  }

  async update(request, response) {
    const repository = (0, _typeorm.getRepository)(_Result.Result);
    const existingResult = await repository.findOne(request.params.uuid);

    if (!existingResult) {
      return response.status(404).json({
        warning: 'Result not found'
      });
    }

    const alteredResult = repository.merge(existingResult, request.body);
    await repository.save(alteredResult);
    return response.status(200).json({
      alteredResult,
      user_id: request.userId
    });
  }

  async destroy(request, response) {
    const repository = (0, _typeorm.getRepository)(_Result.Result);
    await repository.delete(request.params.uuid);
    return response.status(200).json({
      success: 'The result has successfully deleted'
    });
  }

}

var _default = new ResultController();

exports.default = _default;