import { EntityRepository, getRepository, Repository } from 'typeorm';
import Producers from '../entities/Producers';
import _ from 'lodash';
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

interface IQuery {
  query: object;
}

@EntityRepository(Producers)
export class ProducersRepository extends Repository<Producers> {
  public async createProducer({
    cpf_cnpj,
    producer_name,
    farm_name,
    city,
    state,
    total_area_ha,
    cultivable_area_ha,
    vegetation_area_ha,
    crops,
  }: ICreateProducer): Promise<Producers | any> {
    console.log('createProducer');
    const producer = await getRepository(Producers)
      .createQueryBuilder()
      .insert()
      .into('rural_producers')
      .values([cpf_cnpj, producer_name, farm_name, city, state, total_area_ha, cultivable_area_ha, vegetation_area_ha, crops])
      .execute()
      .catch((err) => {
        console.log(err);
      });

    return producer;
  }

  public async listProducers({ query }: IQuery): Promise<Producers | any> {
    const filteredQuery = _.omitBy(query, _.isUndefined);

    const producer = await getRepository(Producers)
      .createQueryBuilder()
      .select('*')
      .where({ ...filteredQuery, deleted_at: null })
      .execute();

    return producer;
  }
  public async getDashboard(): Promise<Producers | any> {
    const producer = await getRepository(Producers).createQueryBuilder().select('*').where({ deleted_at: null }).execute();

    return producer;
  }
}
