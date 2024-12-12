// router 설정
const router = require('express').Router();

// express-validator + 모듈화
const {RatingValidator, RatingValidator2} = require('../express-validator-arr/RatingValidator')

// controller
const RatingController = require('../controller/RatingController');

// router protection
const Protection = require('../util/JWT_Protection_Router');

// rating, ratingReport post middleware
router.post('/register', Protection.routeProtection, RatingValidator2, RatingController.postRating);

// rating all get middleware
router.get('/all' , RatingController.getRatings);

// rating one get middleware
router.get('/one/:id', RatingController.getRating);

// rating delete middleware
router.delete('/delete/:id', Protection.routeProtection, RatingController.deleteOne);

//rating update middleware
router.post('/update/:id', Protection.routeProtection, RatingValidator,RatingController.modiRating);

module.exports = router;