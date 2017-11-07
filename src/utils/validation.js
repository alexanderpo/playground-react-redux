import Joi from 'joi';
import _ from 'lodash';

const validate = (schema, values) => {
  let errors = {};
  Joi.validate(values, schema, (err) => {
    if (!_.isEmpty(err)) {
      const field = err.details[0].context.key;
      const { message } = err.details[0];
      errors = {
        [field]: message,
      };
    }
  });
  return errors;
};

export default validate;
