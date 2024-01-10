import { Router } from 'express';
import ProducersController from '../controllers/ProducersController';
import producersSchema from '../schema/producers.schema';

const producersRouter = Router();
const producersController = new ProducersController();

producersRouter.get('/', producersSchema.listProducers, producersController.list);
producersRouter.get('/dashboard', producersSchema.listProducers, producersController.dashboard);
producersRouter.post('/', producersSchema.createProducer, producersController.create, ((req,res,err) => {
  console.log('er', err);
  console.log(err);
}));
producersRouter.delete('/:producer_id', producersSchema.deleteProducer, producersController.delete);
producersRouter.put('/:producer_id', producersSchema.updateProducer, producersController.update);

export default producersRouter;