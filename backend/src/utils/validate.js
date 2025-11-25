function validate(schema) {
  return (req, res, next) => {
    const data = ['POST', 'PUT', 'PATCH'].includes(req.method) ? req.body : req.query;
    const { error, value } = schema.validate(data, { abortEarly: false, stripUnknown: true });
    if (error) {
      return next({ status: 400, message: 'Validación fallida', details: error.details });
    }
    if (['POST', 'PUT', 'PATCH'].includes(req.method)) req.body = value;
    else req.query = value;
    next();
  };
}

module.exports = validate;
