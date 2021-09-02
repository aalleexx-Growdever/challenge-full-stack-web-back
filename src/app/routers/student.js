import { Router } from 'express';
import StudentController from '../controllers/StudentController';
import {
  verifyData,
  verifyQueryParams,
  verifyARParam,
} from '../middlewares/studentMiddlewares';

const routes = new Router();

routes.get('/students', verifyQueryParams, StudentController.index);
routes.get('/students/:academic_record', verifyARParam, StudentController.show);
routes.post('/students', verifyData, StudentController.store);
routes.put(
  '/students/:academic_record',
  [verifyARParam, verifyData],
  StudentController.update
);
routes.delete(
  '/students/:academic_record',
  verifyARParam,
  StudentController.delete
);

export default routes;
