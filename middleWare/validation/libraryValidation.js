import { librarySchema, bookSchema } from './validationSchema.js';
export const libValidation = async (req, res, next) => {
  try {
    console.log('req Data in valiadation', req.body);
    const validateData = await librarySchema.validate(req.body);
    if (validateData) {
      next();
    }
  } catch (err) {
    const errmsg = err.message;
    res.send({ error: errmsg, code: 500 });
  }
};
export const bookValidation = async (req, res, next) => {
  try {
    console.log('req Data in valiadation', req.body);
    const validateData = await bookSchema.validate(req.body);
    if (validateData) {
      next();
    }
  } catch (err) {
    const errmsg = err.message;
    res.send({ error: errmsg, code: 500 });
  }
};
