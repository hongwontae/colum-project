const { body } = require("express-validator");

exports.PlayResultValidator = [
  // matchDay
  body("matchDay").isDate().withMessage("날짜 데이터 유효성 검사에 실패했습니다."),
  body('matchDay').custom((value)=>{
    console.log(value);
    console.log('___________d______________________')
    const dateMatchDay = new Date(value).setHours(0,0,0,0);
    const currentDate = new Date().setHours(0, 0, 0, 0);
    if(dateMatchDay > currentDate){
        throw new Error('미래의 날짜로 report를 작성할 수 없습니다.');
    }
    return true;
}),
  // myScore, opScore 
  body(["myScore", "opScore"]).isNumeric().withMessage("숫자 데이터가 아닙니다. 숫자로 적어주세요"),
  body(['myScore', 'opScore']).custom((value)=>{
    if(value < 0){
      throw new Error('점수는 음수 값을 가질 수 없습니다. 양수로 적어주세요');
    }
    return true
  }),
  // title
  body("title").isLength({ min: 1 }).withMessage("제목은 하나 이상의 문자열이 필요합니다."),
  // description
  body("description").not().isEmpty().withMessage("본문을 생략할 수 없습니다."),
  // matchTeam 
  body("matchTeam").not().isEmpty().withMessage("팀을 선택해야 합니다."),
];
