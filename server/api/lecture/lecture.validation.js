const Joi = require('joi');

const createLectureSchema = Joi.object({
  title: Joi.string().required(),
  courseId: Joi.string().required(),
  chapterId: Joi.string().required(),
});

const updateLectureSchema = Joi.object({
  title: Joi.string().optional(),
  videoUrl: Joi.string().optional(),
  duration: Joi.number().optional(),
  article: Joi.string().optional(),
  isPublished: Joi.boolean().optional(),
  isFree: Joi.boolean().optional(),
});

const updateLectureOrderSchema = Joi.object({
  order: Joi.number().required().min(1),
});

module.exports = {
  createLectureSchema,
  updateLectureSchema,
  updateLectureOrderSchema,
};
