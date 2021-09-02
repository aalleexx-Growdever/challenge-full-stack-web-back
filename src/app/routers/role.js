import { Router } from 'express';
import RoleController from '../controllers/RoleController';
import {
  verifyData,
  verifyQueryParams,
  verifyIDParam,
} from '../middlewares/roleMiddlewares';

const routes = new Router();

routes.get('/roles', verifyQueryParams, RoleController.index);
routes.get('/roles/:id', verifyIDParam, RoleController.show);
routes.post('/roles', verifyData, RoleController.store);
routes.put('/roles/:id', [verifyIDParam, verifyData], RoleController.update);
routes.delete('/roles/:id', verifyIDParam, RoleController.delete);

export default routes;
