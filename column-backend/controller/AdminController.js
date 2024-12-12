// Model
const AdminModel = require("../model/AdminModel");

// validator, bcryptjs, jsonwebtoken
const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const JWT = require("jsonwebtoken");

// scretKey
const SECRETKEY = require("../util/JWT_SecretKey");

// 관리자 생성
exports.registerUser = async (req, res, next) => {
  const validatorCheck = validationResult(req);

  if (!validatorCheck.isEmpty()) {
    const validatorErr = validatorCheck.array();
    const err = new Error();
    err.status = false;
    err.location = 'validator'
    err.message = 'express-validator registerUser Error'
    err.errObject = validatorErr
    return next(err);
  }

  const { email, password } = req.body;

  try {
    const hashPassword = await bcryptjs.hash(password, 8);
    const userRegisterResult = await AdminModel.create({
      email: email,
      password: hashPassword,
    });
    return res.json({ status: true, data: userRegisterResult });
  } catch (error) {
    const err = new Error();
    err.status = false;
    err.message = "Admin User 등록 중 에러가 발생했습니다.";
    return next(err);
  }
};

// 관리자 로그인
exports.loginAdmin = async (req, res, next) => {

    const valiCheck = validationResult(req);

    if(!valiCheck.isEmpty()){
        const valiArr = valiCheck.array();
        return res.json({message : 'express-validator error', errorInfo : valiArr});
    }


  const { email, password } = req.body;

  try {
    const compareEmail = await AdminModel.findOne({ where: { email: email } });

    if (!compareEmail) {
      const err = new Error();
      err.message = "이메일이 일치하지 않습니다.";
      err.location = 'validator'
      err.status = false;
      return next(err);
    }

    // bcryptjs.compare()의 리턴 값은 boolean입니다.
    const comparePassword = await bcryptjs.compare(
      password,
      compareEmail.password
    );

    if (!comparePassword) {
      const err = new Error();
      err.message = "패스워드가 일치하지 않습니다.";
      err.status = false;
      err.location = 'validator'
      return next(err);
    }

    const token = JWT.sign(
      { email: compareEmail.email, password: compareEmail.password },
      SECRETKEY,
      {
        expiresIn: "1h",
      }
    );

    res.cookie('token', token, {
        httpOnly : true,
        maxAge : 3600000,
        sameSite : 'None',
        secure : true
    })

    return res.json({ status: true, compareEmail, comparePassword });
  } catch (error) {
    const err = new Error();
    err.message = "아이디와 비밀번호를 찾는 중 에러가 발생했습니다.";
    err.status = false;
    return next(err);
  }
};

// 관리자 로그아웃
exports.logoutAdmin = async (req, res, next)=>{
    const token = req.cookies.token;

    if(!token){
        return res.json({status : false, message : 'JWT가 존재하지 않습니다.'});
    }

    return res.clearCookie('token',{
        httpOnly : true,
        maxAge : 360000,
        sameSite : 'None',
        secure : true
    }).json({status : true, messgae : '로그아웃 성공'});

}