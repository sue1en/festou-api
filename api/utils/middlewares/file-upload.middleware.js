const path = require('path');
const formidable = require('formidable');
const fileUtils = require('../file.utils');

const root_dir = path.join(path.dirname(require.main.filename),'tmp')

const fileUpload = (destino, isUpdate = false) => {
  const form = formidable.IncomingForm({keepExtensions: true, uploadDir: root_dir
  });

  return (req, res, next) => {
    form.parse(req, (err, fields, files) => {

      req.body = {
        ...fields,
      }

      if ((!files.image || files.image.name === '') && !isUpdate) {
        return res.status(400).send({
          message: 'não foi possível realizar a operação',
          details: [
            '"imagem" é de preenchimento obrigatório.'
          ]
        });
      }
      if(files.image && files.image.name) {
        const newName = fileUtils.createName(files.image.type);
        const newPath = fileUtils.createAddress(destino, newName);
  
        req.body.image = {
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