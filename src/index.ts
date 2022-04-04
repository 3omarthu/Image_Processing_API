import express from 'express';
import routes from './routes/index';
import fileManagment from './fileManagment';
const app = express();
const port: number = 8080; 

//console.log('TypeScript Eslint Prettier Starter Template!');

app.use(routes);

app.listen(port, async (): Promise<void> => {
    await fileManagment.createSecondfolder();
});

export default app;
