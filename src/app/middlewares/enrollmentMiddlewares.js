import Enrollment from '../models/Enrollment';
import Course from '../models/Course';
import Student from '../models/Student';
import ApiResult from '../utils/ApiResult';
import { parseCPF } from '../utils/RegExp';

async function verifyData(req, resp, next) {
  try {
    const { course, student_cpf } = req.body;

    if (typeof course !== 'string' || course.trim().length === 0) {
      throw Error(
        'Não foi possível validar os dados. Verifique o campo curso.'
      );
    }

    if (!parseCPF(student_cpf)) {
      throw Error('Não foi possível validar os dados. Verifique o campo cpf.');
    }

    const courseExists = await Course.findOne({ where: { course } });

    if (!courseExists) {
      throw Error('Turma não registrada.');
    }

    const studentExists = await Student.findOne({
      where: { cpf: student_cpf },
    });

    if (!studentExists) {
      throw Error('Aluno não registrado.');
    }

    const exists = await Enrollment.findOne({
      where: { student_cpf, course },
    });

    if (exists) {
      throw Error('Aluno já matriculado neste curso.');
    }
  } catch (error) {
    const response = ApiResult.parseError(
      false,
      'INVALID_DATA_PARAMS',
      error.message ? error.message : error,
      'Dados fornecidos para cadastro inválidos.',
      Error
    );

    return resp.status(ApiResult.BAD_REQUEST).json(response);
  }

  return next();
}

async function verifyQueryParams(req, resp, next) {
  try {
    const { course, student_cpf } = req.query;

    if (course) {
      if (typeof course !== 'string' || course.trim().length === 0) {
        throw Error('Parâmetro de filtragem inválido.');
      }

      const exists = await Enrollment.findOne({ where: { course } });

      if (!exists) {
        throw Error('Matrícula não registrada.');
      }
    }

    if (student_cpf) {
      if (!parseCPF(student_cpf)) {
        throw Error('Parâmetro de filtragem inválido.');
      }

      const exists = await Enrollment.findOne({ where: { student_cpf } });

      if (!exists) {
        throw Error('Matrícula não registrada.');
      }
    }
  } catch (error) {
    const response = ApiResult.parseError(
      false,
      'INVALID_QUERY_PARAMS',
      error.message ? error.message : error,
      'Dados fornecidos para filtragem inválidos.',
      Error
    );

    return resp.status(ApiResult.BAD_REQUEST).json(response);
  }

  return next();
}

async function verifyIDParam(req, resp, next) {
  try {
    const id = parseInt(req.params.id, 10);

    if (!Number.isInteger(id)) {
      throw Error('Parâmetro ID inválido.');
    }

    const exists = await Enrollment.findByPk(id);

    if (!exists) {
      throw Error('Matrícula não registrada.');
    }
  } catch (error) {
    const response = ApiResult.parseError(
      false,
      'INVALID_ID_PARAM',
      error.message ? error.message : error,
      'Dados fornecidos para busca inválidos.',
      Error
    );

    return resp.status(ApiResult.BAD_REQUEST).json(response);
  }

  return next();
}

export { verifyData, verifyQueryParams, verifyIDParam };
