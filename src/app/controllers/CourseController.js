import Course from '../models/Course';
import ApiResult from '../utils/ApiResult';

class CourseController {
  async index(req, resp) {
    try {
      const { page = 1, limit = 10 } = req.query;

      const { conditions } = await Course.parseConditions(req.query);

      const { count, rows } = await Course.findAndCountAll({
        where: conditions,
        limit,
        offset: (page - 1) * limit,
        attributes: ['id', 'course'],
      });

      const data = {
        current_page: parseInt(page, 10),
        total_pages: Math.ceil(count / limit),
        total: count,
        courses: rows,
      };

      const response = ApiResult.parseResult(
        true,
        { data },
        'Turmas retornadas com sucesso.'
      );

      return resp.status(ApiResult.OK_WITH_CONTENT).json(response);
    } catch (error) {
      const response = ApiResult.parseError(
        false,
        'COURSE_NOT_FOUND',
        error.message ? error.message : error,
        'Não foram econtrados dados.'
      );
      return resp.status(ApiResult.NOT_FOUND).json(response);
    }
  }

  async show(req, resp) {
    try {
      const id = parseInt(req.params.id, 10);

      const course = await Course.findByPk(id);

      const response = ApiResult.parseResult(
        true,
        { course },
        'Turma retornada com sucesso.'
      );

      return resp.status(ApiResult.OK_WITH_CONTENT).json(response);
    } catch (error) {
      const response = ApiResult.parseError(
        false,
        'COURSE_NOT_FOUND',
        error.message ? error.message : error,
        'Turma não encontrada.'
      );

      return resp.status(ApiResult.NOT_FOUND).json(response);
    }
  }

  async store(req, resp) {
    try {
      const course = await Course.create(req.body);

      const response = ApiResult.parseResult(
        true,
        { course },
        'Turma cadastrada com sucesso.'
      );

      return resp.status(ApiResult.OK_CREATED).json(response);
    } catch (error) {
      const response = ApiResult.parseError(
        false,
        'COURSE_NOT_CREATED',
        error.message ? error.message : error,
        'Não foi possível cadastrar a turma.'
      );

      return resp.status(ApiResult.BAD_REQUEST).json(response);
    }
  }

  async update(req, resp) {
    try {
      const id = parseInt(req.params.id, 10);

      const updated = await Course.update(req.body, { where: { id } });

      if (!updated) {
        throw Error('Erro ao atualizar a turma.');
      }

      const response = ApiResult.parseResult(
        true,
        'COURSE_UPDATED',
        'Turma atualizada com sucesso.'
      );

      return resp.status(ApiResult.OK_WITHOUT_CONTENT).json(response);
    } catch (error) {
      const response = ApiResult.parseError(
        false,
        'COURSE_UPDATE_ERROR',
        error.message ? error.message : error,
        'Não foi possível atualizar a turma.'
      );

      return resp.status(ApiResult.BAD_REQUEST).json(response);
    }
  }

  async delete(req, resp) {
    try {
      const id = parseInt(req.params.id, 10);

      await Course.destroy({ where: { id } });

      const response = ApiResult.parseResult(
        true,
        'COURSE_DELETED',
        'Turma deletada com sucesso.'
      );

      return resp.status(ApiResult.OK_WITHOUT_CONTENT).json(response);
    } catch (error) {
      const response = ApiResult.parseError(
        false,
        'COURSE_DELETE_ERROR',
        error.message ? error.message : error,
        'Não foi possível deletar a turma.'
      );

      return resp.status(ApiResult.BAD_REQUEST).json(response);
    }
  }
}

export default new CourseController();
