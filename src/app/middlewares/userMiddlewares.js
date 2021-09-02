import User from '../models/User';
import ApiResult from '../utils/ApiResult';
import { parseCPF, parseEmail } from '../utils/RegExp';

async function verifyData(req, resp, next) {
  try {
    const { name, email, cpf, role, password } = req.body;

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

    const emailExists = await User.findOne({ where: { email } });

    if (emailExists) {
      throw Error('Email já cadastrado.');
    }

    if (
      typeof role !== 'string' ||
      role.trim().length === 0 ||
      /[0-9]+/.test(role)
    ) {
      throw Error(
        'Não foi possível validar os dados. Verifique o campo função.'
      );
    }

    if (password.trim().length === 0) {
      throw Error(
        'Não foi possível validar os dados. Verifique o campo senha.'
      );
    }

    if (!parseCPF(cpf)) {
      throw Error('Não foi possível validar os dados. Verifique o campo cpf.');
    }

    const cpfExists = await User.findOne({ where: { cpf } });

    if (cpfExists) {
      throw Error('CPF já cadastrado.');
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
    const { name, cpf, email, role } = req.query;

    if (name) {
      if (
        typeof name !== 'string' ||
        name.trim().length === 0 ||
        /[0-9]+/.test(name)
      ) {
        throw Error('Parâmetro de filtragem inválido. Verifique o campo nome.');
      }

      const exists = await User.findOne({ where: { name } });

      if (!exists) {
        throw Error('Usuário não registrado.');
      }
    }

    if (cpf) {
      if (!parseCPF(cpf)) {
        throw Error('Parâmetro de filtragem inválido. Verifique o campo CPF.');
      }

      const exists = await User.findOne({ where: { cpf } });

      if (!exists) {
        throw Error('Usuário não registrado.');
      }
    }

    if (email) {
      if (!parseEmail(email)) {
        throw Error(
          'Parâmetro de filtragem inválido. Verifique o campo email.'
        );
      }

      const exists = await User.findOne({ where: { email } });

      if (!exists) {
        throw Error('Usuário não registrado.');
      }
    }

    if (role) {
      if (
        typeof role !== 'string' ||
        role.trim().length === 0 ||
        /[0-9]+/.test(role)
      ) {
        throw Error(
          'Parâmetro de filtragem inválido. Verifique o campo função.'
        );
      }

      const exists = await User.findOne({ where: { role } });

      if (!exists) {
        throw Error('Usuário não registrado.');
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

    const exists = await User.findByPk(id);

    if (!exists) {
      throw Error('Usuário não registrado.');
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
