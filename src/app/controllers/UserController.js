import User from '../models/User';
import ApiResult from '../utils/ApiResult';

class UserController {
  async index(req, resp) {
    try {
      const { page = 1, limit = 10 } = req.query;

      const { conditions } = await User.parseConditions(req.query);

      const { count, rows } = await User.findAndCountAll({
        where: conditions,
        limit,
        offset: (page - 1) * limit,
        attributes: ['id', 'name', 'role', 'email', 'cpf'],
      });

      const data = {
        current_page: parseInt(page, 10),
        total_pages: Math.ceil(count / limit),
        total: count,
        users: rows,
      };

      const response = ApiResult.parseResult(
        true,
        { data },
        'Usuários retornados com sucesso.'
      );

      return resp.status(ApiResult.OK_WITH_CONTENT).json(response);
    } catch (error) {
      const response = ApiResult.parseError(
        false,
        'USER_NOT_FOUND',
        error.message ? error.message : error,
        'Não foram econtrados dados.'
      );
      return resp.status(ApiResult.NOT_FOUND).json(response);
    }
  }

  async show(req, resp) {
    try {
      const id = parseInt(req.params.id, 10);

      const user = await User.findByPk(id);

      const response = ApiResult.parseResult(
        true,
        {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            cpf: user.cpf,
            role: user.role,
          },
        },
        'Usuário retornado com sucesso.'
      );

      return resp.status(ApiResult.OK_WITH_CONTENT).json(response);
    } catch (error) {
      const response = ApiResult.parseError(
        false,
        'USER_NOT_FOUND',
        error.message ? error.message : error,
        'Usuário não encontrado.'
      );

      return resp.status(ApiResult.NOT_FOUND).json(response);
    }
  }

  async store(req, resp) {
    try {
      const user = await User.create(req.body);

      const response = ApiResult.parseResult(
        true,
        {
          user: {
            id: user.id,
            name: user.name,
            role: user.role,
            email: user.email,
            cpf: user.cpf,
          },
        },
        'Usuário cadastrado com sucesso.'
      );

      return resp.status(ApiResult.OK_CREATED).json(response);
    } catch (error) {
      const response = ApiResult.parseError(
        false,
        'USER_NOT_CREATED',
        error.message ? error.message : error,
        'Não foi possível cadastrar o usuário.'
      );

      return resp.status(ApiResult.BAD_REQUEST).json(response);
    }
  }

  async update(req, resp) {
    try {
      const id = parseInt(req.params.id, 10);

      await User.update(req.body, { where: { id } });

      const response = await ApiResult.parseResult(
        true,
        'USER_UPDATED',
        'Usuário atualizado com sucesso.'
      );

      return resp.status(ApiResult.OK_WITHOUT_CONTENT).json(response);
    } catch (error) {
      const response = ApiResult.parseError(
        false,
        'USER_UPDATE_ERROR',
        error.message ? error.message : error,
        'Não foi possível atualizar o usuário.'
      );

      return resp.status(ApiResult.BAD_REQUEST).json(response);
    }
  }

  async delete(req, resp) {
    try {
      const id = parseInt(req.params.id, 10);

      await User.destroy({ where: { id } });

      const response = await ApiResult.parseResult(
        true,
        'USER_DELETED',
        'Usuário deletado com sucesso.'
      );

      return resp.status(ApiResult.OK_WITHOUT_CONTENT).json(response);
    } catch (error) {
      const response = ApiResult.parseError(
        false,
        'USER_DELETE_ERROR',
        error.message ? error.message : error,
        'Não foi possível deletar ao usuário.'
      );

      return resp.status(ApiResult.BAD_REQUEST).json(response);
    }
  }
}

export default new UserController();
