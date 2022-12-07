// middlewares/auth-middleware.js

const jwt = require("jsonwebtoken");
const { Users } = require('../models');

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  const [authType, authToken] = (authorization || "").split(" ");
 

  if (!authToken || authType !== "Bearer") {
    res.status(401).send({
      errorMessage: "로그인 후 이용 가능한 기능입니다.",
    });
    return;
  }

  try {
    const  nickname  = jwt.verify(authToken, "loosecretkey");
    console.log(nickname)


    const some = await Users.findOne({
        where: { 'nickname' : nickname }
    });

      res.locals.user = some;
      next();
 
  } catch (err) {
    res.status(401).send({
      errorMessage: "로그인 후 이용 가능한 기능입니다.",
    });
    
  }
};