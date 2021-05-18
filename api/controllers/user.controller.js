const userService = require('../services/user.service');

module.exports = {

  authCTRL: async (req, res, next) => {
    const{ email, password } = req.body;
  
    const serviceResult = await userService.authUserService(email, password);
    
    const statusCodeReturn = serviceResult.success ? 200 : 401;
    const dataReturn = statusCodeReturn.success ? { data:serviceResult.data} : {detalhes:serviceResult.detalhes};
  
    return res.status(statusCodeReturn).send({messege:serviceResult.message,
    ...dataReturn
    });
  },


}