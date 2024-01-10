import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn } from 'typeorm';

@Entity('rural_producers')
export default class RuralProducer {
  @PrimaryGeneratedColumn({type: 'integer', name: 'producer_id'})
  producer_id: number;

  @Column({ name: 'cpf_cnpj', length: 20 })
  cpf_cnpj: string;

  @Column({ name: 'producer_name', length: 255 })
  producer_name: string;

  @Column({ name: 'farm_name', length: 255 })
  farm_name: string;

  @Column({ length: 100 })
  city: string;

  @Column({ length: 2 })
  state: string;

  @Column({ name: 'total_area_ha', type: 'numeric' })
  total_area_ha: number;

  @Column({ name: 'cultivable_area_ha', type: 'numeric' })
  cultivable_area_ha: number;

  @Column({ name: 'vegetation_area_ha', type: 'numeric' })
  vegetation_area_ha: number;

  @Column('text', { array: true })
  crops: string[];

  @DeleteDateColumn()
  deleted_at?: Date;
}
