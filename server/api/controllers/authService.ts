import * as Joi from 'joi';


export default {

     validateSignupSchema(body) {
        const schema = Joi.object().keys({
          email: Joi.string().email().required(),
          password: Joi.string().required(),
          username: Joi.string().required()
        });

        const { error , value } = Joi.validate(body, schema);
        if ( error && error.details ) {
               return { error };
        }

        return { value};
     },

     validateLoginSchema(body) {
      const schema = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      });
      const { error , value } = Joi.validate(body, schema);
      if ( error && error.details ) {
             return { error };
      }
      return { value};
    },

};



