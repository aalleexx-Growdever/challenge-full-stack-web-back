import { Router } from 'express';
import RoleController from '../controllers/RoleController';
import {
  verifyData,
  verifyUniqueData,
  verifyQueryParams,
  verifyIDParam,
} from '../middlewares/roleMiddlewares';

const routes = new Router();

routes.get('/roles', verifyQueryParams, RoleController.index);
routes.get('/roles/:id', verifyIDParam, RoleController.show);
routes.post('/roles', [verifyData, verifyUniqueData], RoleController.store);
routes.put(
  '/roles/:id',
  [verifyIDParam, verifyData, verifyUniqueData],
  RoleController.update
);
routes.delete('/roles/:id', verifyIDParam, RoleController.delete);

export default routes;
