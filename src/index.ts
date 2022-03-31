import express from 'express';
import routes from './routes/index';
import fileManagment from './fileManagment';
const app = express();
const port: number = 8080; 


app.use(routes);

app.listen(port, async (): Promise<void> => {
});

export default app;
