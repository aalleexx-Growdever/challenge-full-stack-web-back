import { Router } from 'express';
import UserController from '../controllers/UserController';
import {
  verifyData,
  verifyQueryParams,
  verifyIDParam,
  verifyEditedData,
} from '../middlewares/userMiddlewares';

const routes = new Router();

routes.get('/users', verifyQueryParams, UserController.index);
routes.get('/users/:id', verifyIDParam, UserController.show);
routes.post('/users', verifyData, UserController.store);
routes.put(
  '/users/:id',
  [verifyIDParam, verifyEditedData],
  UserController.update
);
routes.delete('/users/:id', verifyIDParam, UserController.delete);

export default routes;
