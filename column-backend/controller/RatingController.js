// rating과 player와 report의 관계 설정으로 복잡함

// Model
const RatingModel = require("../model/Rating");
const RatingReport = require("../model/RatingReport");
const PlayerModel = require("../model/Player");
const DB = require('../util/DB');

// express-validator
const {validationResult} = require('express-validator');

// post
// rating은 playerId와 ratingreport에 일대다 관계를 갖습니다.
// playerId는 프론트에서 가져왔고 ratingReport는 생성하면 rrId를 가져와서 왜리키와 함꼐 rating을 저장합니다.
exports.postRating = async (req, res, next) => {
  const validator = validationResult(req);

  if(!validator.isEmpty()){
    const validErrObj =  validator.array();
    const err = new Error();
    err.location = 'validator';
    err.status = false;
    err.message = 'Rating post 중 에러 발생';
    err.errObject = validErrObj;
    return next(err);
  }

  const { title, day, matchTeam, matchDesc, ratings } = req.body;
  console.log({title, day, matchTeam, matchDesc});
  console.log(ratings);
  try {
    const RatingReportResult = await RatingReport.create({
      title,
      reportDate: day,
      oppenent: matchTeam,
      reportDescription: matchDesc,
    });

    console.log(ratings);
    const formatData = ratings.map((ele) => {
      if(!ele.rating){
        return;
      }
      return {
        pId : ele.pId,
        rating: Number(ele.rating),
        rrId: RatingReportResult.rrId,
      };
    }).filter(ele=> ele !== undefined);


    const RatingResult = await RatingModel.bulkCreate(formatData);

    return res.json({
      status: true,
      message: "Success report and rating",
      data: RatingResult,
    });
  } catch (error) {
    const err = new Error();
    err.location = "general";
    err.message = "rating, ratingReport create 중 에러 발생했습니다.";
    err.status = false;
    return next(err);
  }
};

// pagination all rating
exports.getRatings = async (req, res, next) => {
  const page = req?.query?.page || 1;
  const limit = 4;
  const offset = (page - 1) * limit;

  try {
    const { count, rows } = await RatingReport.findAndCountAll({
      limit,
      offset,
      order: [["rrId", "DESC"]],
    });
    const totalPages = Math.ceil(count / limit);

    return res.json({
      status: true,
      items: rows,
      totalItemCount: count,
      currentPage: page,
      totalPages: totalPages,
    });
  } catch (error) {
    const err = new Error();
    err.location = "general";
    err.message = "RatingReport pagination 중 에러가 발생했습니다.";
    err.status = false;
    return next(err);
  }
};

// one rating get
exports.getRating = async (req, res, next) => {
  const rrId = req.params.id;

  const RatingReportData = await RatingReport.findOne({
    where: { rrId: rrId },
  });

  const RatingAndPlayerData = await RatingModel.findAll({
    attributes: ["rating"],
    include: [
      { model: PlayerModel, attributes: ["playerName", "pId"], required: true },
    ],
    where: { rrId: rrId },
  });

  return res.json({
    status: true,
    message: "Success get one data",
    rrData: RatingReportData,
    RPData: RatingAndPlayerData,
  });
};

// delete rating http
exports.deleteOne = async (req, res, next) => {
  const id = req.params.id;

  try {
    // cascade로 인해 report를 삭제하면 평점도 같이 삭제됩니다.
    const deleteReport = await RatingReport.destroy({ where: { rrId: id } });
    return res.json({
      status: true,
      message: "RatingReport, rating delete Success",
      data: deleteReport,
    });
  } catch (error) {
    const err = new Error();
    err.location = "general";
    err.message = "report와 rating 삭제 중 에러 발생했습니다.";
    err.status = false;
    return next(err);
  }
};

// modi rating
exports.modiRating = async (req, res, next) => {

  const validator = validationResult(req);

  if(!validator.isEmpty()){
    const invalidReson = validator.array();
    const err = new Error();
    err.location = 'validator';
    err.errObject = invalidReson;
    err.status = false;
    err.message = 'Update rating의 validator에서 유효한 데이터가 들어오지 않았습니다.'
    return next(err);
  }

  const { title, matchDesc, matchDay, matchTeam, ratings } = req.body;
  const id = req.params.id;


  const formatRating = ratings.map((ele)=>{
    return {
      rating : ele.rating,
      pId : ele.pId
    }
  })

  const elseRating = ratings.filter(ele=>{
    return !Number(ele.rating)
  });
  console.log(elseRating);

  try {
    const updateRR = await RatingReport.update(
      {
        title,
        reportDate: matchDay,
        oppenent: matchTeam,
        reportDescription: matchDesc,
      },
      { where: { rrId: id } }
    );

    const updatesData = await DB.transaction( async (t)=>{
      for(const rating of formatRating){
        await RatingModel.update(
          {rating : rating.rating},
          {
            where : {
              pId : rating.pId,
              rrId : id
            },
            transaction : t
          }
        )
      }
    })

    return res.json({status : true, message : 'update Success', reportData : updateRR, ratingData : updatesData});

  } catch (error) {
    const err = new Error();
    err.location = 'general';
    err.message = 'Rating, Rating-Report update 중 에러';
    err.status = false  
    return next(err);
  }

};
