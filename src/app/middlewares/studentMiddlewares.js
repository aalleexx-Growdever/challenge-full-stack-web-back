import Student from '../models/Student';
import ApiResult from '../utils/ApiResult';
import { parseCPF, parseEmail } from '../utils/RegExp';

async function verifyData(req, resp, next) {
  try {
    const { name, email, cpf } = req.body;

    if (
      typeof name !== 'string' ||
      name.trim().length === 0 ||
      /[0-9]+/.test(name)
    ) {
      throw Error('Não foi possível validar os dados. Verifique o campo nome.');
    }

    if (!parseEmail(email)) {
      throw Error(
        'Não foi possível validar os dados. Verifique o campo email.'
      );
    }

    if (!parseCPF(cpf)) {
      throw Error('Não foi possível validar os dados. Verifique o campo cpf.');
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
    const { name, cpf, email } = req.query;

    if (name) {
      if (
        typeof name !== 'string' ||
        name.trim().length === 0 ||
        /[0-9]+/.test(name)
      ) {
        throw Error('Parâmetro de filtragem inválido. Verifique o campo nome.');
      }

      const exists = await Student.findOne({ where: { name } });

      if (!exists) {
        throw Error('Aluno não registrado.');
      }
    }

    if (cpf) {
      if (!parseCPF(cpf)) {
        throw Error('Parâmetro de filtragem inválido. Verifique o campo CPF.');
      }

      const exists = await Student.findOne({ where: { cpf } });

      if (!exists) {
        throw Error('Aluno não registrado.');
      }
    }

    if (email) {
      if (!parseEmail(email)) {
        throw Error(
          'Parâmetro de filtragem inválido. Verifique o campo email.'
        );
      }

      const exists = await Student.findOne({ where: { email } });

      if (!exists) {
        throw Error('Aluno não registrado.');
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

async function verifyARParam(req, resp, next) {
  try {
    const academic_record = parseInt(req.params.academic_record, 10);

    if (!Number.isInteger(academic_record)) {
      throw Error('Parâmetro "registro acadêmico" inválido.');
    }

    const exists = await Student.findOne({ where: { academic_record } });

    if (!exists) {
      throw Error('Aluno não registrado.');
    }
  } catch (error) {
    const response = ApiResult.parseError(
      false,
      'INVALID_AR_PARAM',
      error.message ? error.message : error,
      'Dados fornecidos para busca inválidos.',
      Error
    );

    return resp.status(ApiResult.BAD_REQUEST).json(response);
  }

  return next();
}

export { verifyData, verifyQueryParams, verifyARParam };
