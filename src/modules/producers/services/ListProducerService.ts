import { getCustomRepository } from 'typeorm';
import Producer from '../typeorm/entities/Producers';
import {  ProducersRepository } from '../typeorm/repositories/ProducersRepository';

interface IRequest {
  query: {done?: boolean;}
}

class ListProducersService {
	public async execute({ query }: IRequest): Promise<Producer[]> {
		const producersRepository = getCustomRepository(ProducersRepository);

		const producers = await producersRepository.listProducers({ query });

		return producers;
	}
}

export default ListProducersService;
