import User from '../models/User';
import ApiResult from '../utils/ApiResult';

class LoginController {
  async index(req, resp) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        where: { email },
        attributes: ['id', 'name', 'role'],
      });

      if (!user) {
        throw Error('Email inválido.');
      }

      if (!(await user.checkPassword(password))) {
        throw Error('Senha inválida.');
      }

      const response = ApiResult.parseResult(
        true,
        { user },
        'Login realizado com sucesso.'
      );

      return resp.status(ApiResult.OK_WITH_CONTENT).json(response);
    } catch (error) {
      const response = ApiResult.parseError(
        false,
        'LOGIN_ERROR',
        error.message ? error.message : error,
        'Não foi possível realizar o login.'
      );
      return resp.status(ApiResult.UNAUTHORIZED).json(response);
    }
  }
}

export default new LoginController();
