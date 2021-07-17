const path = require('path');
const formidable = require('formidable');
const fileUtils = require('../file.utils');

const BusinessRuleError = require('../errors/error-business-rule');

const root_dir = path.join(path.dirname(require.main.filename),'tmp');

const isPostValid = (files) => {
  if((!files.image || files.image.name === '')){
    return false
  }
  return true;
};

const isPutValid = (files) => {
  if((!files.image || files.image.name === '')) {
    return false
  }
  return true;
};

const fileUpload = (destino, isUpdate = false) => {
  return async (req, res, next) => {
    const form = formidable.IncomingForm({keepExtensions: true, uploadDir: root_dir
    });

    var formfields = await new Promise(function(resolve, reject) {
      form.parse(req, (error, fields, files) => {
        if(error){
          return reject(error);
        }
        resolve({
          ...fields,
          files
        });
      })
    });

    const { files, ...fields } = formfields;

    req.body = {
      ...fields,
    }

    if (req.mothod === 'POST') {
      if(!isPostValid(files))
      throw new BusinessRuleError('"Image" é de preenchimento obrigatório.');
    };

    if (req.mothod === 'POST') {
      if(!isPutValid(files))
      throw new BusinessRuleError('"Image" é de preenchimento obrigatório.');
    };

    if(files.image && files.image.name !== ''){
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

    next();
  }
};

module.exports = fileUpload;