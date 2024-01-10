import AppError from '@shared/errors/AppError';
import { getCustomRepository, UpdateResult } from 'typeorm';
import { ProducersRepository } from '@modules/producers/typeorm/repositories/ProducersRepository';

interface IRequest {
  producer_id: number;
}

class DeleteProducerService {
	public async execute({ producer_id }: IRequest): Promise<UpdateResult> {
		const producersRepository = getCustomRepository(ProducersRepository);


		const [producerFound] = await producersRepository.find({where:{producer_id}});

		if(!producerFound){
			throw new AppError('Producer não encontrada', 404);
		}

		const producers = await producersRepository.softDelete({producer_id});

		if(producers.raw.affectedRows == 0){
			throw new AppError('Producer não deletada.');
		}

		return producers;
	}
}

export default DeleteProducerService;
