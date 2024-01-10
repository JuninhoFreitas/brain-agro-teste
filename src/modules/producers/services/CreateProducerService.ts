import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Producer from '../typeorm/entities/Producers';
import { ProducersRepository } from '../typeorm/repositories/ProducersRepository';

interface ICreateProducer {
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

class CreateProducerService {
  public async execute({
    cpf_cnpj,
    producer_name,
    farm_name,
    city,
    state,
    total_area_ha,
    cultivable_area_ha,
    vegetation_area_ha,
    crops,
  }: ICreateProducer): Promise<Producer | undefined> {
    const producersRepository = getCustomRepository(ProducersRepository);

    const isValidTotalArea = this.validateTotalArea(total_area_ha, cultivable_area_ha, vegetation_area_ha);

    if (!isValidTotalArea) {
      throw new AppError('Área Total deve ser maior que Área Cultivável e Area de Vegetação', 400);
    }

    const newProducer = producersRepository.create({
      cpf_cnpj,
      producer_name,
      farm_name,
      city,
      state,
      total_area_ha,
      cultivable_area_ha,
      vegetation_area_ha,
      crops,
    });

    const {
      generatedMaps: [createdProducer],
    } = await producersRepository.insert(newProducer);

    const insertedProducer = await producersRepository.findOne({
      where: { producer_id: createdProducer.producer_id },
    });

    if (!insertedProducer) {
      throw new AppError('Producer não registrada.');
    }

    return insertedProducer;
  }

  private validateTotalArea(total_area_ha: number, cultivable_area_ha: number, vegetation_area_ha: number): boolean {
    return total_area_ha >= cultivable_area_ha + vegetation_area_ha;
  }
}

export default CreateProducerService;
