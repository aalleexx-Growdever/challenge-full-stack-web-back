import Student from '../models/Student';
import ApiResult from '../utils/ApiResult';
import ARService from '../services/GenerateAcademicRecord';

class StudentController {
  async index(req, resp) {
    try {
      const { page = 1, limit = 10 } = req.query;

      const { conditions } = await Student.parseConditions(req.query);

      const { count, rows } = await Student.findAndCountAll({
        where: conditions,
        limit,
        offset: (page - 1) * limit,
        attributes: ['academic_record', 'name', 'cpf', 'email'],
      });

      const data = {
        current_page: parseInt(page, 10),
        total_pages: Math.ceil(count / limit),
        total: count,
        students: rows,
      };

      const response = ApiResult.parseResult(
        true,
        { data },
        'Alunos retornados com sucesso.'
      );

      return resp.status(ApiResult.OK_WITH_CONTENT).json(response);
    } catch (error) {
      const response = ApiResult.parseError(
        false,
        'STUDENT_NOT_FOUND',
        error.message ? error.message : error,
        'Não foram econtrados dados.'
      );
      return resp.status(ApiResult.NOT_FOUND).json(response);
    }
  }

  async show(req, resp) {
    try {
      const academic_record = parseInt(req.params.academic_record, 10);

      const student = await Student.findOne({ where: { academic_record } });

      const response = ApiResult.parseResult(
        true,
        { student },
        'Aluno retornado com sucesso.'
      );

      return resp.status(ApiResult.OK_WITH_CONTENT).json(response);
    } catch (error) {
      const response = ApiResult.parseError(
        false,
        'STUDENT_NOT_FOUND',
        error.message ? error.message : error,
        'Aluno não encontrado.'
      );

      return resp.status(ApiResult.NOT_FOUND).json(response);
    }
  }

  async store(req, resp) {
    try {
      const academic_record = await ARService.generateUniqueAR();
      req.body.academic_record = academic_record;

      const student = await Student.create(req.body);

      const response = ApiResult.parseResult(
        true,
        {
          student: {
            academic_record: student.academic_record,
            name: student.name,
            cpf: student.cpf,
            email: student.email,
          },
        },
        'Aluno cadastrado com sucesso.'
      );

      return resp.status(ApiResult.OK_CREATED).json(response);
    } catch (error) {
      const response = ApiResult.parseError(
        false,
        'STUDENT_NOT_CREATED',
        error.message ? error.message : error,
        'Não foi possível cadastrar o aluno.'
      );

      return resp.status(ApiResult.BAD_REQUEST).json(response);
    }
  }

  async update(req, resp) {
    try {
      const academic_record = parseInt(req.params.academic_record, 10);

      await Student.update(req.body, { where: { academic_record } });

      const response = await ApiResult.parseResult(
        true,
        'STUDENT_UPDATED',
        'Aluno atualizado com sucesso.'
      );

      return resp.status(ApiResult.OK_WITHOUT_CONTENT).json(response);
    } catch (error) {
      const response = ApiResult.parseError(
        false,
        'STUDENT_UPDATE_ERROR',
        error.message ? error.message : error,
        'Não foi possível atualizar o aluno.'
      );

      return resp.status(ApiResult.BAD_REQUEST).json(response);
    }
  }

  async delete(req, resp) {
    try {
      const academic_record = parseInt(req.params.academic_record, 10);

      await Student.destroy({ where: { academic_record } });

      const response = await ApiResult.parseResult(
        true,
        'STUDENT_DELETED',
        'Aluno deletado com sucesso.'
      );

      return resp.status(ApiResult.OK_WITHOUT_CONTENT).json(response);
    } catch (error) {
      const response = ApiResult.parseError(
        false,
        'STUDENT_DELETE_ERROR',
        error.message ? error.message : error,
        'Não foi possível deletar o aluno.'
      );

      return resp.status(ApiResult.BAD_REQUEST).json(response);
    }
  }
}

export default new StudentController();
