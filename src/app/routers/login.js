import { Router } from 'express';
import LoginController from '../controllers/LoginController';
import verifyData from '../middlewares/loginMiddlewares';

const routes = new Router();

routes.get('/login', verifyData, LoginController.index);

export default routes;
