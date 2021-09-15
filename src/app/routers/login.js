import { Router } from 'express';
import LoginController from '../controllers/LoginController';
import { verifyData } from '../middlewares/loginMiddlewares';

const routes = new Router();

routes.post('/login', verifyData, LoginController.index);

export default routes;
