import { MigrationInterface, QueryRunner } from 'typeorm';
import RuralProducer from '../../../modules/producers/typeorm/entities/Producers';

export class Migrations1704848876287 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const mockData = [
      {
        cpf_cnpj: '12345678901',
        producer_name: 'John Doe',
        farm_name: 'Doe Farm',
        city: 'Example City',
        state: 'CA',
        total_area_ha: 100,
        cultivable_area_ha: 70,
        vegetation_area_ha: 30,
        crops: ['Soybean', 'Corn', 'Cotton'],
      },
      {
        cpf_cnpj: '75.136.991/0001-33',
        producer_name: 'John Doe',
        farm_name: 'Doe Farm',
        city: 'Example City',
        state: 'CA',
        total_area_ha: 100,
        cultivable_area_ha: 70,
        vegetation_area_ha: 30,
        crops: ['Soybean', 'Corn', 'Cotton'],
      },
    ];

    await queryRunner.manager.save(RuralProducer, mockData);
  }

  public async down(_queryRunner: QueryRunner): Promise<void> {
    await _queryRunner.query('DELETE FROM rural_producers');
  }
}
