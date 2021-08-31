import { Router } from 'express';
import RoleController from '../controllers/RoleController';

const routes = new Router();

routes.get('/roles', RoleController.index);
routes.get('/roles/:id', RoleController.show);
routes.post('/roles', RoleController.store);
routes.put('/roles/:id', RoleController.update);
routes.delete('/roles/:id', RoleController.delete);

export default routes;
