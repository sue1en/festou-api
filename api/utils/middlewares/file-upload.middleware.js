const formidable = require('formidable');
const fileUtils = require('../file.utils');

const fileUpload = (destino) => {
  const form = formidable.IncomingForm();
  return (req, res, next) => {
    form.parse(req, (err, fields, files) => {
      if (!files.image) {
        return res.status(400).send({
          message: 'não foi possível realizar a operação',
          details: [
            '"image" é de preenchimento obrigatório.'
          ]
        });
      }

      const newName = fileUtils.createName(files.image.type);
      const newPath = fileUtils.createAdress(destino, newName);

      req.body = {
        ...fields,
        image: {
          type: files.image.type,
          originalName: files.image.name,
          originalPath: files.image.path,
          newName,
          newPath,
        }
      }
      return next();
    });
  }
}

module.exports = fileUpload;