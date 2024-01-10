import { Router } from 'express';
import ProducersController from '../controllers/ProducersController';

const producersDashboardRouter = Router();
const producersController = new ProducersController();

producersDashboardRouter.get('/', producersController.dashboard);

export default producersDashboardRouter;