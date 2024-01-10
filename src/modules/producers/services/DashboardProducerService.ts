import { getCustomRepository } from 'typeorm';
import { ProducersRepository } from '../typeorm/repositories/ProducersRepository';

interface ICulturePieChart {
  culture: string;
  count: number;
}

interface IStatePieChart {
  state: string;
  count: number;
}

export interface IProducerDashboard {
  totalFarms: number;
  totalFarmArea: number;
  statePieChart: IStatePieChart[];
  culturePieChart: ICulturePieChart[];
  landUsePieChart: { agriculturalArea: number; vegetationArea: number };
}

class DashboardProducersService {
  public async execute(): Promise<IProducerDashboard> {
    const dashboard = await this._getDashboard();
    return dashboard;
  }

  async _getDashboard(): Promise<IProducerDashboard> {
    const results = await Promise.all([
      this._getCulturePieChart(),
      this._getLandUsePieChart(),
      this._getStatePieChart(),
      this._getTotalFarmArea(),
      this._getTotalFarms(),
    ]);
    return {
      culturePieChart: results[0],
      landUsePieChart: results[1],
      statePieChart: results[2],
      totalFarmArea: results[3],
      totalFarms: results[4],
    };
  }

  async _getTotalFarms(): Promise<number> {
    const producersRepository = getCustomRepository(ProducersRepository);
    return producersRepository.count();
  }

  async _getTotalFarmArea(): Promise<number> {
    const producersRepository = getCustomRepository(ProducersRepository);
    const result = await producersRepository.query('SELECT SUM(total_area_ha) AS "totalFarmArea" FROM rural_producers where deleted_at is null');
    console.log('result', result);
    return result[0].totalFarmArea || 0;
  }

  async _getStatePieChart(): Promise<IStatePieChart[]> {
    const producersRepository = getCustomRepository(ProducersRepository);
    return producersRepository.query('SELECT state, COUNT(*) AS count FROM rural_producers where deleted_at is null GROUP BY state ');
  }

  async _getCulturePieChart(): Promise<ICulturePieChart[]> {
    const producersRepository = getCustomRepository(ProducersRepository);
    return producersRepository.query(
      'SELECT UNNEST(crops) AS culture, COUNT(*) AS count FROM rural_producers where deleted_at is null GROUP BY culture'
    );
  }

  async _getLandUsePieChart(): Promise<{ agriculturalArea: number; vegetationArea: number }> {
    const producersRepository = getCustomRepository(ProducersRepository);
    const result = await producersRepository.query(
      `SELECT SUM(cultivable_area_ha) AS "agriculturalArea", SUM(vegetation_area_ha) AS "vegetationArea" 
			FROM rural_producers where deleted_at is null`
    );
    return {
      agriculturalArea: Number(result[0].agriculturalArea) || 0,
      vegetationArea: Number(result[0].vegetationArea) || 0,
    };
  }
}

export default DashboardProducersService;
