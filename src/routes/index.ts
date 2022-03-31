import express from 'express';
import images from './api/images';

const routes = express.Router();

routes.use('/api/images', images);

routes.get(
  '/',
  (req: express.Request, res: express.Response): void => {
    res.send(
    );
  }
);

export default routes;