// Model
const PlayResultModel = require("../model/PlayResultModel");

// express-validator
const {validationResult} = require('express-validator')

// play-result post middleware
exports.postResult = async (req, res, next) => {

  const validator = validationResult(req);

  if(!validator.isEmpty()){
    const errorObj = validator.array();
    const err = new Error();
    err.location = 'validator';
    err.message = 'PlayResult post 중에 에러가 발생했습니다.';
    err.status = false
    err.errObject = errorObj
    return next(err);
  }


  const { title, description, matchTeam, matchDay, myScore, opScore } =
    req.body;

  
    
  const filename = req?.file?.filename;

  if (!filename) {
    try {
      const imageNoneResult = await PlayResultModel.create({
        title,
        matchTeam,
        playDescription: description,
        date: matchDay,
        myScore,
        opponentScore: opScore,
        imagePath: "not image",
      });
      return res.json({
        status: true,
        message: "image None",
        data: imageNoneResult,
      });
    } catch (error) {
      const err = new Error();
      err.location = "general";
      err.status = false;
      err.message = "image가 없는 play-result 저장 중 에러";
    }
  }

  try {
    const playResult = await PlayResultModel.create({
      title,
      matchTeam,
      playDescription: description,
      date: matchDay,
      myScore,
      opponentScore: opScore,
      imagePath: filename,
    });
    return res.json({
      status: true,
      message: "post success",
      data: playResult,
    });
  } catch (error) {
    const err = new Error();
    err.location = "general";
    (err.status = false),
      (err.message = "playResult 저장 중 에러 발생했습니다.");
    return next(err);
  }
};

// play-result get+pagination middleware
exports.getResults = async (req, res, next) => {
  const page = req?.query?.page || 1;
  const limit = 4;
  const offset = (page - 1) * limit;

  try {
    // 해당 페이지에 관한 item과 총 개수
    const { count, rows } = await PlayResultModel.findAndCountAll({
      limit,
      offset,
      order : [['playId', 'DESC']]
    });

    // 총 페이지 계산
    const totalPages = Math.ceil(count / limit);

    return res.json({
      items: rows,
      totalItemCount: count,
      currentPage: page,
      totalPages: totalPages,
    });
  } catch (error) {
    const err = new Error();
    err.status = false;
    err.location = "general";
    err.message = "get Result findAll 중에 에러 발생";
    return next(err);
  }
};

// one data get middleware
exports.getOne = async (req, res, next) => {
  const id = req.query.id;

  try {
    const oneResult = await PlayResultModel.findOne({ where: { playId: id } });
    return res.json({
      status: true,
      message: "Success one data",
      data: oneResult,
    });
  } catch (error) {
    const err = new Error();
    err.location = "general";
    err.status = false;
    err.message = "단일 데이터를 find 하는데 실패했습니다.";
    return next(err);
  }
};

// modify middleware
exports.modifyResult = async (req, res, next) => {
  // 일반 데이터는 들어오는거로 대체하면 됩니다.
  // but image는 다른 이미지가 들어오든가, 기존의 이미지입니다.

  console.log(req.body)
  console.log('-----------------------------------------------')

  const validator = validationResult(req);

  if(!validator.isEmpty()){
    const errorObj = validator.array();
    const err = new Error();
    err.location = 'validator';
    err.message = 'PlayResult Update 중 에러가 발생했습니다.';
    err.status = false;
    err.errObject = errorObj;
    return next(err);
  }

  const id = req.params.id;
  const fileData = req?.file?.filename;

  const { title, description, matchTeam, matchDay, myResult, opResult } =
    req.body;

  try {
    if (!fileData) {
      const modiResult = await PlayResultModel.update(
        {
          title,
          playDescription: description,
          date: matchDay,
          myScore: myResult,
          opponentScore: opResult,
          matchTeam,
        },
        { where: { playId: id } }
      );
      return res.json({status : true, message : '기존 이미지/update 완료', data : modiResult});
    }

    if(fileData){
      const modiResult = await PlayResultModel.update(
        {
          title,
          playDescription: description,
          date: matchDay,
          myScore: myResult,
          opponentScore: opResult,
          matchTeam,
          imagePath : fileData
        },
        { where: { playId: id } }
      );
      return res.json({status : true, message : 'image update/update 완료', data : modiResult})
    }


  } catch (error) {
    const err = new Error();
    err.location = 'general';
    err.status = false;
    err.message = 'play-result update 중에 에러가 발생했습니다.';
    return next(err);
  }

};

exports.deleteOne = async (req, res, next) => {
    const id = req.params.id;

    try {
      const deleteResult = await PlayResultModel.destroy({where : {playId : id}})
      return res.json({status : true, message : 'delete success', data : deleteResult});
    } catch (error) {
      const err = new Error();
      err.location = 'general';
      err.message = 'delete 중 에러 발생했습니다.';
      err.status = false;
      return next(err);
    } 


}
