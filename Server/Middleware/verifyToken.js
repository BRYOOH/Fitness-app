const jwt = require("jsonwebtoken");


const verifyToken = async (req, res, next) => {
  
    if (!req.headers.authorization) {
      return res.status(400).json({success:false, errors:"You are not authenticated!"}) ;
    }

    const token = req.headers.authorization.split(" ")[1];  

    if (!token) return res.status(400).json({success:false, errors:"You are not authenticated. Enter token!"}) ;
  
    const decode = jwt.verify(token, "secret_token");

    req.user = { id: decode.id};
    
    return next();
  
};

module.exports={verifyToken};