import { Router } from 'express';
import EnrollmentController from '../controllers/EnrollmentController';
import {
  verifyData,
  verifyQueryParams,
  verifyIDParam,
} from '../middlewares/enrollmentMiddlewares';

const routes = new Router();

routes.get('/enrollments', verifyQueryParams, EnrollmentController.index);
routes.get('/enrollments/:id', verifyIDParam, EnrollmentController.show);
routes.post('/enrollments', verifyData, EnrollmentController.store);
routes.put(
  '/enrollments/:id',
  [verifyIDParam, verifyData],
  EnrollmentController.update
);
routes.delete('/enrollments/:id', verifyIDParam, EnrollmentController.delete);

export default routes;
