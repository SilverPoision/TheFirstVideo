const joi = require("joi");

exports.channelSchema = (data) => {
  schema = joi.object({
    name: joi.string().min(6).required(),
    priority: joi.number().required(),
  });
  return schema.validate(data);
};

exports.deletePrioritySchema = (data) => {
  schema = joi.object({
    id: joi.string().min(6).required(),
  });
  return schema.validate(data);
};
