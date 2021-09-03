import { Router } from 'express';

const routes = new Router();

routes.get('/', (req, resp) => {
  resp.send('Hello World!!');
});

export default routes;
