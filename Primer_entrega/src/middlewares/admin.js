const admin= true;

const isAdmin=(req,res,next)=>{
    if(!admin) res.send({error:"Usted no esta AUTORIZADO"});
    next()
};

export {isAdmin};