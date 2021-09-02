import Course from '../models/Course';
import ApiResult from '../utils/ApiResult';

async function verifyData(req, resp, next) {
  try {
    const { course } = req.body;

    if (typeof course !== 'string' || course.trim().length === 0) {
      throw Error(
        'Não foi possível validar os dados. Verifique o campo curso.'
      );
    }

    const exists = await Course.findOne({ where: { course } });

    if (exists) {
      throw Error('Curso já cadastrado.');
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
    const { course } = req.query;

    if (course) {
      if (typeof course !== 'string' || course.trim().length === 0) {
        throw Error('Parâmetro de filtragem inválido.');
      }

      const exists = await Course.findOne({ where: { course } });

      if (!exists) {
        throw Error('Turma não registrada.');
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

    const exists = await Course.findByPk(id);

    if (!exists) {
      throw Error('Turma não registrada.');
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
