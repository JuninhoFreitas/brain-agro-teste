import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { ProducersRepository } from '../typeorm/repositories/ProducersRepository';
import _ from 'lodash';
import Producer from '../typeorm/entities/Producers';

interface IRequest {
  producer_id: number;
  cpf_cnpj: string;
  producer_name: string;
  farm_name: string;
  city: string;
  state: string;
  total_area_ha: number;
  cultivable_area_ha: number;
  vegetation_area_ha: number;
  crops: string[];
}

class UpdateProducerService {
  public async execute({
    producer_id,
    cpf_cnpj,
    producer_name,
    farm_name,
    city,
    state,
    total_area_ha,
    cultivable_area_ha,
    vegetation_area_ha,
    crops,
  }: IRequest): Promise<Producer | undefined> {
    const producersRepository = getCustomRepository(ProducersRepository);
    const entity = { cpf_cnpj, producer_name, farm_name, city, state, total_area_ha, cultivable_area_ha, vegetation_area_ha, crops };
    const filteredEntity = _.omitBy(entity, _.isUndefined);

    const [producerFound] = await producersRepository.find({ where: { producer_id } });

    if (!producerFound) {
      throw new AppError('Producer não encontrada', 404);
    }

    const producers = await producersRepository.update({ producer_id }, filteredEntity);

    if (producers.raw.affectedRows == 0) {
      throw new AppError('Producer não atualizada.');
    }

    return await producersRepository.findOne({ producer_id });
  }
}

export default UpdateProducerService;
