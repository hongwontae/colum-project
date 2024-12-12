// 기초 설정
const express = require('express');
const router = express.Router();

const Protection = require('../util/JWT_Protection_Router')

// controller
const AdminController = require('../controller/AdminController')

// Model
const AdminModel = require('../model/AdminModel');

// validator
const {body} = require('express-validator');

// 관리자 등록 router
router.post('/register', [
    body('email').isEmail().withMessage('이메일 형식을 갖춰주세요')
    .custom( async (value, {})=>{
        // 관리자를 생성할 떄만 throw를 제거합니다.
        // throw new Error('관리자 생성 불가입니다.')
        const coincidenceEmail =  await AdminModel.findOne({where : {email : value}});

        if(coincidenceEmail){
            throw new Error('동일한 관리자 ID가 존재합니다.');
        }

        return true;
    }),
    body('password').isLength({min : 10}).withMessage('최소 10자가 넘어야 합니다.')
], AdminController.registerUser);

// 관리자 로그인 router
router.post('/check', [
    body('email').isEmail().withMessage('이메일 형식을 갖춰주세요'),
    body('password').isLength({min : 10}).withMessage('최소 10자가 넘어야 합니다.')
], AdminController.loginAdmin);

// 관리자 로그아웃 router
router.post('/logout', AdminController.logoutAdmin);

// 인증 상태 제공 미들웨어
router.post('/credential', Protection.generalProtection);

module.exports = router;