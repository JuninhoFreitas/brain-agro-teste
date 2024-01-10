import { celebrate, Segments } from 'celebrate';
import BaseJoi from 'joi';
import validator from 'cpf-cnpj-validator';

const Joi = BaseJoi.extend(validator);

const producersSchema = {
	listProducers: celebrate({
		[Segments.QUERY]: {
			producer_name: Joi.string().optional(),
			farm_name: Joi.string().optional(),
			city: Joi.string().optional(),
			state: Joi.string().optional(),
		},
	}),
	createProducer: celebrate({
		[Segments.BODY]: {
			cpf_cnpj: BaseJoi.alternatives().try(
				Joi.document().cpf(),
				Joi.document().cnpj(),
			).required(
			),
			producer_name: Joi.string().required(),
			farm_name: Joi.string().required(),
			city: Joi.string().required(),
			state: Joi.string().required(),
			total_area_ha: Joi.number().required(),
			cultivable_area_ha: Joi.number().required(),
			vegetation_area_ha: Joi.number().required(),
			crops: Joi.array().items(Joi.string()).required(),
		},
	}),
	deleteProducer: celebrate({
		[Segments.PARAMS]: {
			producer_id: Joi.number().required()
		},
	}),
	updateProducer: celebrate({
		[Segments.BODY]: {
			cpf_cnpj: Joi.string().required(),
			producer_name: Joi.string().required(),
			farm_name: Joi.string().required(),
			city: Joi.string().required(),
			state: Joi.string().required(),
			total_area_ha: Joi.number().required(),
			cultivable_area_ha: Joi.number().required(),
			vegetation_area_ha: Joi.number().required(),
			crops: Joi.array().items(Joi.string()).required(),
		},
		[Segments.PARAMS]: {
			producer_id: Joi.number().required()
		},
	})
};


export default producersSchema;