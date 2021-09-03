import Enrollment from '../models/Enrollment';
import ApiResult from '../utils/ApiResult';

class EnrollmentController {
  async index(req, resp) {
    try {
      const { page = 1, limit = 10 } = req.query;

      const { conditions } = await Enrollment.parseConditions(req.query);

      const { count, rows } = await Enrollment.findAndCountAll({
        where: conditions,
        limit,
        offset: (page - 1) * limit,
        attributes: ['id', 'course', 'student_cpf'],
      });

      const data = {
        current_page: parseInt(page, 10),
        total_pages: Math.ceil(count / limit),
        total: count,
        enrollments: rows,
      };

      const response = ApiResult.parseResult(
        true,
        { data },
        'Matrículas retornadas com sucesso.'
      );

      return resp.status(ApiResult.OK_WITH_CONTENT).json(response);
    } catch (error) {
      const response = ApiResult.parseError(
        false,
        'ENROLLMENT_NOT_FOUND',
        error.message ? error.message : error,
        'Não foram econtrados dados.'
      );
      return resp.status(ApiResult.NOT_FOUND).json(response);
    }
  }

  async show(req, resp) {
    try {
      const id = parseInt(req.params.id, 10);

      const enrollment = await Enrollment.findByPk(id);

      const response = ApiResult.parseResult(
        true,
        { enrollment },
        'Matrícula retornada com sucesso.'
      );

      return resp.status(ApiResult.OK_WITH_CONTENT).json(response);
    } catch (error) {
      const response = ApiResult.parseError(
        false,
        'ENROLLMENT_NOT_FOUND',
        error.message ? error.message : error,
        'Matrícula não encontrada.'
      );

      return resp.status(ApiResult.NOT_FOUND).json(response);
    }
  }

  async store(req, resp) {
    try {
      const enrollment = await Enrollment.create(req.body);

      const response = ApiResult.parseResult(
        true,
        { enrollment },
        'Matrícula cadastrada com sucesso.'
      );

      return resp.status(ApiResult.OK_CREATED).json(response);
    } catch (error) {
      const response = ApiResult.parseError(
        false,
        'ENROLLMENT_NOT_CREATED',
        error.message ? error.message : error,
        'Não foi possível cadastrar a matrícula.'
      );

      return resp.status(ApiResult.BAD_REQUEST).json(response);
    }
  }

  async update(req, resp) {
    try {
      const id = parseInt(req.params.id, 10);

      const updated = await Enrollment.update(req.body, { where: { id } });

      if (!updated) {
        throw Error('Erro ao atualizar a matrícula.');
      }

      const response = ApiResult.parseResult(
        true,
        'ENROLLMENT_UPDATED',
        'Matrícula atualizada com sucesso.'
      );

      return resp.status(ApiResult.OK_WITHOUT_CONTENT).json(response);
    } catch (error) {
      const response = ApiResult.parseError(
        false,
        'ENROLLMENT_UPDATE_ERROR',
        error.message ? error.message : error,
        'Não foi possível atualizar a matrícula.'
      );

      return resp.status(ApiResult.BAD_REQUEST).json(response);
    }
  }

  async delete(req, resp) {
    try {
      const id = parseInt(req.params.id, 10);

      await Enrollment.destroy({ where: { id } });

      const response = ApiResult.parseResult(
        true,
        'ENROLLMENT_DELETED',
        'Matrícula deletada com sucesso.'
      );

      return resp.status(ApiResult.OK_WITHOUT_CONTENT).json(response);
    } catch (error) {
      const response = ApiResult.parseError(
        false,
        'ENROLLMENT_DELETE_ERROR',
        error.message ? error.message : error,
        'Não foi possível deletar a matrícula.'
      );

      return resp.status(ApiResult.BAD_REQUEST).json(response);
    }
  }
}

export default new EnrollmentController();
