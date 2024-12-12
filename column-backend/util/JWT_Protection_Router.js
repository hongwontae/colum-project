const JWT = require("jsonwebtoken");
const SECRET_KEY = require("../util/JWT_SecretKey");

exports.routeProtection = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json({ jStatus: false, message: "token이 존재하지 않습니다." });
  }

  JWT.verify(token, SECRET_KEY, (tErr, decoded) => {
    if (tErr) {
      const err = new Error();
      err.jStatus = false;
      err.location = 'jwt'
      err.message = "token verify 중에 에러가 발생했습니다.";
      err.object = tErr;
      return next(err);
    }

    return next();
  });
};

exports.generalProtection = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json({ jStatus: false, message: "token이 존재하지 않습니다." });
  }

  JWT.verify(token, SECRET_KEY, (tErr, decoded) => {
    if (tErr) {
      const err = new Error();
      err.status = false;
      err.location = 'jwt'
      err.message = "token verify 중에 에러가 발생했습니다.";
      err.object = tErr;
      return next(err);
    }

    return res.json({jStatus : true, message : 'JWT'})
  });
};
