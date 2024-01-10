import { Router } from 'express';
import producersRouter from '@modules/producers/routes/producers.router';
import dashboardRouter from '@modules/producers/routes/dashboards.router';
import AppError from '@shared/errors/AppError';

const routes = Router();

routes.use('/producers', producersRouter);
routes.use('/dashboard', dashboardRouter);
routes.use(()=>{
	throw new AppError('Rota não encontrada', 404);
});

export default routes;
