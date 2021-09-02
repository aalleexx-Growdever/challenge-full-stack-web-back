import Role from '../models/Role';
import ApiResult from '../utils/ApiResult';

async function verifyData(req, resp, next) {
  try {
    const { name } = req.body;

    if (
      typeof name !== 'string' ||
      name.trim().length === 0 ||
      /[0-9]+/.test(name)
    ) {
      throw Error('Não foi possível validar os dados. Verifique o campo nome.');
    }

    const exists = await Role.findOne({ where: { name } });

    if (exists) {
      throw Error('Função já registrada.');
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
    const { name } = req.query;

    if (name) {
      if (
        typeof name !== 'string' ||
        name.trim().length === 0 ||
        /[0-9]+/.test(name)
      ) {
        throw Error('Parâmetro de filtragem inválido.');
      }

      const exists = await Role.findOne({ where: { name } });

      if (!exists) {
        throw Error('Função não registrada.');
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
      throw Error('Parâmetro ID deve ser um número inteiro.');
    }

    const exists = await Role.findByPk(id);

    if (!exists) {
      throw Error('Função não registrada.');
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
