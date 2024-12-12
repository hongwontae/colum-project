const PlayerModel = require("../model/Player");

exports.getAllPlayer = async (req, res, next) => {
  try {
    const startPlayerData = await PlayerModel.findAll({
      where: { start_bol: true },
    });
    const subPlayerData = await PlayerModel.findAll({
      where: { start_bol: false },
    });
    return res.json({
      status: true,
      message: "start member and sub member Success",
      start: startPlayerData.map(ele=>{
        return {
          pId : ele.pId,
          playerName : ele.playerName,
          start_bol : ele.start_bol,
          backNumber : ele.backNumber,
          position : ele.position,
          rating : ''
        }
      }),
      sub: subPlayerData.map(ele=>{
        return {
          pId : ele.pId,
          playerName : ele.playerName,
          start_bol : ele.start_bol,
          backNumber : ele.backNumber,
          position : ele.position,
          rating : ''
        }
      }),
    });
  } catch (error) {
    const err = new Error();
    err.status = false;
    err.message = 'start 멤버와 sub 멤버를 get 중 에러가 발생했습니다.';
    err.location = 'general';
    return next(err);
  }

  // start member 11로 확인완료
  // const check = await PlayerModel.count({where : {'start_bol' : true}});
  // console.log(check)
};
