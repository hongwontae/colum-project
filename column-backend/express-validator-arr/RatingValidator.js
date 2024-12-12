const {body} = require('express-validator');
const PlayerModel = require('../model/Player');

exports.RatingValidator = [
    // 미래의 날짜 등록 불가 && 날짜 데이터 확인
    // day
    body('ratings').custom(async (value)=>{
        const player = (await PlayerModel.findAll()).map((ele)=>{
            return ele.playerName
        })

        for(rating of value){
            if(!player.includes(rating.playerName)){
                throw new Error('추가한 선수 이름이 정확하지 않습니다. 수정하고 다시 요청 부탁드립니다.');
            }
        }
        return true;

    }),
    body('ratings').custom(async (value) =>{
        for(rating of value){
            if(+rating.rating > 9 || +rating.rating < 0){
                throw new Error('평점 바운더리에서 벗어났습니다.');
            }
        }
        return true
    }),
    body('day').custom((value)=>{
        const dateMatchDay = new Date(value).setHours(0,0,0,0);
        const currentDate = new Date().setHours(0, 0, 0, 0);
        if(dateMatchDay > currentDate){
            throw new Error('미래의 날짜로 report를 작성할 수 없습니다.');
        }
        return true;
    }),
    body('day').isDate().withMessage('날짜 데이터가 없거나 유효하지 않습니다.'),
    // title
    body('title').isLength({min : 1}).withMessage('제목은 하나 이상의 문자로 이루어져야 합니다.'),
    // matchTeam
    body('matchTeam').not().isEmpty().withMessage('팀을 선택해야 합니다.'),
    // matchDesc
    body('matchDesc').not().isEmpty().withMessage('본문을 작성해야 합니다.')
]

exports.RatingValidator2 = [
    body('day').custom((value)=>{
        const dateMatchDay = new Date(value).setHours(0,0,0,0);
        const currentDate = new Date().setHours(0, 0, 0, 0);
        if(dateMatchDay > currentDate){
            throw new Error('미래의 날짜로 report를 작성할 수 없습니다.');
        }
        return true;
    }),
    body('day').isDate().withMessage('날짜 데이터가 없거나 유효하지 않습니다.'),
    // title
    body('title').isLength({min : 1}).withMessage('제목은 하나 이상의 문자로 이루어져야 합니다.'),
    // matchTeam
    body('matchTeam').not().isEmpty().withMessage('팀을 선택해야 합니다.'),
    // matchDesc
    body('matchDesc').not().isEmpty().withMessage('본문을 작성해야 합니다.'),
    body('ratings').custom(async (value)=>{
        for(rating of value){
            if(+rating.rating > 9 || +rating.rating < 0){
                throw new Error('평점 바운더리에서 벗어났습니다.');
            }
        }
        return true
    })
]