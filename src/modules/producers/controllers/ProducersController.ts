import { Request, Response } from 'express';
import CreateProducerService from '../services/CreateProducerService';
import DeleteProducerService from '../services/DeleteProducerService';
import ListProducerService from '../services/ListProducerService';
import UpdateProducerService from '../services/UpdateProducerService';
import DashboardProducersService from '../services/DashboardProducerService';

export default class ProducersController {
  public async list(request: Request, response: Response): Promise<Response> {
    const { query } = request;
    const listProducersService = new ListProducerService();

    const producers = await listProducersService.execute({ query });

    return response.json({
      success: true,
      data: producers,
    });
  }
  public async create(request: Request, response: Response): Promise<Response> {
    const { cpf_cnpj, producer_name, farm_name, city, state, total_area_ha, cultivable_area_ha, vegetation_area_ha, crops } = request.body;
    const createProducerService = new CreateProducerService();

    const createdProducer = await createProducerService.execute({
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


    return response.status(201).json({
      success: true,
      data: createdProducer,
    });
  }
  public async delete(request: Request, response: Response): Promise<Response> {
    const { producer_id } = request.params;
    const deleteProducerService = new DeleteProducerService();

    await deleteProducerService.execute({ producer_id: Number(producer_id) });

    return response.status(204).json({
      success: true,
    });
  }
  public async update(request: Request, response: Response): Promise<Response> {
    const { producer_id } = request.params;
    const { cpf_cnpj, producer_name, farm_name, city, state, total_area_ha, cultivable_area_ha, vegetation_area_ha, crops } = request.body;

    const updateProducerService = new UpdateProducerService();

    const updatedProducer = await updateProducerService.execute({
      producer_id: Number(producer_id),
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

    return response.status(200).json({
      success: true,
      data: updatedProducer,
    });
  }
  public async dashboard(_request: Request, response: Response): Promise<Response> {
    const listProducersService = new DashboardProducersService();

    const producers = await listProducersService.execute();

    return response.json({
      success: true,
      data: producers,
    });
  }
}
