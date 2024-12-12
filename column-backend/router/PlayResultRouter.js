// router 설정
const router = require('express').Router();

// resource 보호
const protection = require('../util/JWT_Protection_Router')

//validator 모듈화
const PlayResultValidator = require('../express-validator-arr/PlayResultValidator').PlayResultValidator

// controller
const PlayResultController = require('../controller/PlayResultController');

// 하나의 result 생성하는 미들웨어
router.post('/register', protection.routeProtection, PlayResultValidator, PlayResultController.postResult);

// 모든 결과를 return 해주는 미들웨어
router.get('/result', PlayResultController.getResults)

// 단일 결과를 return 해주는 미들웨어
router.get('/one', PlayResultController.getOne);

// 수정해주는 미들웨어
router.post('/modi/:id', protection.routeProtection, PlayResultValidator, PlayResultController.modifyResult);

// 삭제해주는 미들웨어
router.delete('/delete/:id', protection.routeProtection, PlayResultController.deleteOne);


module.exports = router;