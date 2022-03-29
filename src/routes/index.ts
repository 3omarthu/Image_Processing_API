import express from 'express';
import images from './api/images';

const routes = express.Router();

routes.use('/api/images', images);

routes.get(
  '/',
  (req: express.Request, res: express.Response): void => {
    res.send(
      '<h1>You can try the system by clicking the link as an example</h1><ul><li><a href="/api/images?filename=encenadaport&width=100&height=100">/api/images?filename=encenadaport&width=100&height=100</a></li></ul></p>'
    );
  }
);

export default routes;