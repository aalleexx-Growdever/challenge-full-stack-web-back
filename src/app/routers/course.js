import { Router } from 'express';
import CourseController from '../controllers/CourseController';
import {
  verifyData,
  verifyQueryParams,
  verifyIDParam,
} from '../middlewares/courseMiddlewares';

const routes = new Router();

routes.get('/courses', verifyQueryParams, CourseController.index);
routes.get('/courses/:id', verifyIDParam, CourseController.show);
routes.post('/courses', verifyData, CourseController.store);
routes.put(
  '/courses/:id',
  [verifyIDParam, verifyData],
  CourseController.update
);
routes.delete('/courses/:id', verifyIDParam, CourseController.delete);

export default routes;
