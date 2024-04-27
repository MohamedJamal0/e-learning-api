const Joi = require('joi');

const updateCourseSchema = Joi.object({
  title: Joi.string().optional(),
  subtitle: Joi.string().optional(),
  description: Joi.string().optional(),
  coverImage: Joi.string().optional(),
  isFree: Joi.boolean().optional(),
  isPublished: Joi.boolean().optional(),
  level: Joi.string().valid('Beginner', 'Intermediate', 'Advanced').optional(),
  category: Joi.string().optional(),
  price: Joi.number().optional(),
});

module.exports = {
  updateCourseSchema,
};
