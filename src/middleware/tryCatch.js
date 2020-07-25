module.exports =  function (controller) {
    return async (req,res,next)=>{
        try {
            await controller(req,res,next);
          } catch (ex) {
            next(ex);
          }
    }
};