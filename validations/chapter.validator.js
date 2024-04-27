const Joi = require('joi');

const createChapterSchema = Joi.object({
  title: Joi.string().required(),
  courseId: Joi.string().required(),
});

const updateChapterSchema = Joi.object({
  title: Joi.string().optional(),
});

const updateChapterOrderSchema = Joi.object({
  order: Joi.number().required().min(0),
});

module.exports = {
  createChapterSchema,
  updateChapterOrderSchema,
  updateChapterSchema,
};
