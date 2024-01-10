import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Migrations1704832925365 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'rural_producers',
        columns: [
          {
            name: 'producer_id',
            type: 'int',
            isNullable: false,
            isUnique: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'cpf_cnpj',
            type: 'varchar',
            length: '20',
          },
          {
            name: 'producer_name',
            type: 'varchar',
            length: '255',
            },
            {
            name: 'farm_name',
            type: 'varchar',
            length: '255',
            },
            {
            name: 'city',
            type: 'varchar',
            length: '100',
            },
            {
            name: 'state',
            type: 'varchar',
            length: '2',
            },
            {
            name: 'total_area_ha',
            type: 'numeric',
            },
            {
            name: 'cultivable_area_ha',
            type: 'numeric',
            },
            {
            name: 'vegetation_area_ha',
            type: 'numeric',
            },
            {
            name: 'crops',
            type: 'varchar',
            isArray: true,
            },
            {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
            },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('producers');
  }
}
