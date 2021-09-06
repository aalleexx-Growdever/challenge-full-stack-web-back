import ApiResult from '../utils/ApiResult';
import { parseEmail } from '../utils/RegExp';

async function verifyData(req, resp, next) {
  try {
    const { email, password } = req.body;

    if (!parseEmail(email)) {
      throw Error(
        'Não foi possível validar os dados. Verifique o campo email.'
      );
    }

    if (password.trim().length === 0) {
      throw Error(
        'Não foi possível validar os dados. Verifique o campo senha.'
      );
    }
  } catch (error) {
    const response = ApiResult.parseError(
      false,
      'INVALID_LOGIN_PARAMS',
      error.message ? error.message : error,
      'Dados fornecidos para login inválidos.',
      Error
    );

    return resp.status(ApiResult.BAD_REQUEST).json(response);
  }

  return next();
}

export default verifyData;
