"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _User = require("../entities/User");

class UserController {
  async index(request, response) {
    const repository = (0, _typeorm.getRepository)(_User.User);
    const {
      take,
      keyword
    } = request.query;
    const userExists = await repository.findOne(request.userId);

    if (userExists) {
      if (userExists.isRootUser) {
        try {
          const [users, total] = await repository.findAndCount({
            where: keyword ? {
              fullname: (0, _typeorm.Like)(`%${keyword}%`),
              isRootUser: false
            } : {
              isRootUser: false
            },
            order: {
              fullname: 'ASC'
            },
            relations: ['results'],
            take
          });

          if (users) {
            users.map(user => {
              delete user.password;
              delete user.isRootUser;
            });
          }

          return response.status(200).json(users
          /* {users, total: Math.ceil(total * 0.1) * 10 } */
          );
        } catch (error) {
          console.log(error);
          return response.status(400).json({
            failure: error
          });
        }
      } else {
        return response.status(401).json({
          warning: "You're not allowed to access the system"
        });
      }
    } else {
      return response.status(404).json({
        warning: 'User not found'
      });
    }
  }

  async show(request, response) {
    const repository = (0, _typeorm.getRepository)(_User.User);
    const userExists = await repository.findOne(request.userId);

    if (userExists) {
      if (userExists.isRootUser) {
        try {
          const user = await repository.findOne({
            where: {
              id: request.params.userId,
              isRootUser: false
            },
            relations: ['results']
          });

          if (user) {
            delete user.password;
            delete user.isRootUser;
          }

          return response.status(200).json(user);
        } catch (error) {
          console.log(error);
        }
      } else {
        return response.status(401).json({
          warning: "You're not allowed to access the system"
        });
      }
    } else {
      return response.status(404).json({
        warning: 'User not found'
      });
    }
  }

  async store(request, response) {
    const repository = (0, _typeorm.getRepository)(_User.User);
    const {
      document,
      email,
      fullname,
      password,
      birth_date
    } = request.body;

    try {
      const searchedByEmail = await repository.findOne({
        where: {
          email
        }
      });
      const searchedByDocument = await repository.findOne({
        where: {
          document
        }
      });

      if (searchedByEmail) {
        return response.status(409).json({
          warning: 'the e-mail you entered is already registered'
        });
      } else if (searchedByDocument) {
        return response.status(409).json({
          warning: 'the document you entered is already registered'
        });
      }
    } catch (err) {
      console.log(`Unable to fetch email or document from database. err: ${err}`);
    }

    const user = repository.create({
      document,
      email,
      fullname,
      password,
      birth_date
    });
    await repository.save(user);
    return response.status(200).json({
      success: 'successfully registered user',
      fullname
    });
  }

  async store_root(request, response) {
    const repository = (0, _typeorm.getRepository)(_User.User);
    const {
      document,
      email,
      fullname,
      password,
      birth_date
    } = request.body;

    try {
      const searchedByEmail = await repository.findOne({
        where: {
          email
        }
      });
      const searchedByDocument = await repository.findOne({
        where: {
          document
        }
      });

      if (searchedByEmail) {
        return response.status(409).json({
          warning: 'the e-mail you entered is already registered'
        });
      } else if (searchedByDocument) {
        return response.status(409).json({
          warning: 'the document you entered is already registered'
        });
      }
    } catch (err) {
      console.log(`Unable to fetch email or document from database. err: ${err}`);
    }

    const user = repository.create({
      document,
      email,
      fullname,
      password,
      birth_date,
      isRootUser: true
    });
    await repository.save(user);
    return response.status(200).json({
      success: 'successfully registered user',
      fullname
    });
  }

  async update(request, response) {
    const repository = (0, _typeorm.getRepository)(_User.User);
    const userExists = await repository.findOne(request.userId);

    if (userExists) {
      if (userExists.isRootUser) {
        const existingUser = await repository.findOne(request.params.userId);

        if (!existingUser) {
          return response.status(404).json({
            warning: 'User not found'
          });
        }

        const alteredClient = repository.merge(existingUser, request.body);
        await repository.save(alteredClient);
        return response.status(200).json(alteredClient.id);
      } else {
        return response.status(401).json({
          warning: "You're not allowed to access the system"
        });
      }
    } else {
      return response.status(404).json({
        warning: 'User not found'
      });
    }
  }

  async destroy(request, response) {
    const repository = (0, _typeorm.getRepository)(_User.User);
    const userExists = await repository.findOne(request.userId);

    if (userExists) {
      if (userExists.isRootUser) {
        await repository.delete(request.params.userId);
        return response.status(200).json({
          success: 'The user has successfully deleted'
        });
      } else {
        return response.status(401).json({
          warning: "You're not allowed to access the system"
        });
      }
    } else {
      return response.status(404).json({
        warning: 'User not found'
      });
    }
  }

}

var _default = new UserController();

exports.default = _default;