import Role from '../models/Role';
import ApiResult from '../utils/ApiResult';

class RoleController {
  async index(req, resp) {
    try {
      const { page = 1, limit = 10 } = req.query;

      const { conditions } = await Role.parseConditions(req.query);

      const { count, rows } = await Role.findAndCountAll({
        where: conditions,
        limit,
        offset: (page - 1) * limit,
        attributes: ['id', 'name'],
      });

      const data = {
        current_page: parseInt(page, 10),
        total_pages: Math.ceil(count / limit),
        total: count,
        roles: rows,
      };

      const response = ApiResult.parseResult(
        true,
        { data },
        'Funções retornadas com sucesso.'
      );

      return resp.status(ApiResult.OK_WITH_CONTENT).json(response);
    } catch (error) {
      const response = ApiResult.parseError(
        false,
        'ROLE_NOT_FOUND',
        error.message ? error.message : error,
        'Não foram econtrados dados.'
      );
      return resp.status(ApiResult.NOT_FOUND).json(response);
    }
  }

  async show(req, resp) {
    try {
      const id = parseInt(req.params.id, 10);

      const role = await Role.findByPk(id);

      const response = ApiResult.parseResult(
        true,
        { role },
        'Função retornada com sucesso.'
      );

      return resp.status(ApiResult.OK_WITH_CONTENT).json(response);
    } catch (error) {
      const response = ApiResult.parseError(
        false,
        'ROLE_NOT_FOUND',
        error.message ? error.message : error,
        'Função não encontrada.'
      );

      return resp.status(ApiResult.NOT_FOUND).json(response);
    }
  }

  async store(req, resp) {
    try {
      const role = await Role.create(req.body);

      const response = ApiResult.parseResult(
        true,
        { role },
        'Função cadastrada com sucesso.'
      );

      return resp.status(ApiResult.OK_CREATED).json(response);
    } catch (error) {
      const response = ApiResult.parseError(
        false,
        'ROLE_NOT_CREATED',
        error.message ? error.message : error,
        'Não foi possível cadastrar a função.'
      );

      return resp.status(ApiResult.BAD_REQUEST).json(response);
    }
  }

  async update(req, resp) {
    try {
      const id = parseInt(req.params.id, 10);

      const updated = await Role.update(req.body, { where: { id } });

      if (!updated) {
        throw Error('Erro ao atualizar a função.');
      }

      const response = ApiResult.parseResult(
        true,
        'ROLE_UPDATED',
        'Função atualizada com sucesso.'
      );

      return resp.status(ApiResult.OK_WITHOUT_CONTENT).json(response);
    } catch (error) {
      const response = ApiResult.parseError(
        false,
        'ROLE_UPDATE_ERROR',
        error.message ? error.message : error,
        'Não foi possível atualizar a função.'
      );

      return resp.status(ApiResult.BAD_REQUEST).json(response);
    }
  }

  async delete(req, resp) {
    try {
      const id = parseInt(req.params.id, 10);

      await Role.destroy({ where: { id } });

      const response = ApiResult.parseResult(
        true,
        'ROLE_DELETED',
        'Função deletada com sucesso.'
      );

      return resp.status(ApiResult.OK_WITHOUT_CONTENT).json(response);
    } catch (error) {
      const response = ApiResult.parseError(
        false,
        'ROLE_DELETE_ERROR',
        error.message ? error.message : error,
        'Não foi possível deletar a função.'
      );

      return resp.status(ApiResult.BAD_REQUEST).json(response);
    }
  }
}

export default new RoleController();
