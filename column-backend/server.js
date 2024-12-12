// 기초 설정
const express = require("express");
const app = express();

// 라우터
const AdminRouter = require("./router/AdminRouter");
const PlayResultRouter = require("./router/PlayResultRouter");
const PlayerRouter = require('./router/PlayerRouter')
const RatingRouter = require('./router/RatingRouter');

// DB 설정 (MySql + Sequelize)
const DB = require("./util/DB");
const AdminModel = require("./model/AdminModel");
const PlayerModel = require("./model/Player");
const PlayResultModel = require("./model/PlayResultModel");
const RatingModel = require("./model/Rating");
const RatingReportModel = require("./model/RatingReport");

// cookie-parser
const cookieParser = require("cookie-parser");

// multer 설정
const multer = require("multer");
const path = require('path');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: ({}, { originalname }, cb) => {
    const ext = path.extname(originalname);
    cb(null, decodeURIComponent(originalname) + Math.random().toFixed(6) + ext);
  },
});
const upload = multer({ storage });

// body-parser
app.use(express.json());
// cookie parser
app.use(cookieParser());
// static middleware 허용
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// cors
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

// admin 관리자 생성, 로그인, 로그아웃
app.use("/admin", AdminRouter);

// playResult post 관련 미들웨어
app.use("/play-result", upload.single("image"), PlayResultRouter);

// Player 관련 미들웨어
app.use('/player', PlayerRouter);

// Rating 관련 미들웨어
app.use('/rating', RatingRouter);

// 범용 error처리 핸들러
app.use((error, req, res, next) => {
  if ((error.location = "validator")) {
    return res.json({
      status: error.status,
      message: error.message,
      validatorResult: error.errObject,
    });
  }
  if (error.location === "jwt") {
    return res.json({
      jStatus: error.jStatus,
      message: error.message,
      errorObj: error.object,
    });
  }

  if(error.location === 'general'){
    return res.json({
      status : error.status,
      message : error.message
    })
  }

});

// 서버 가동
DB.sync().then(() => {
  app.listen(8080, () => {
    console.log("DB and express server running");
  });
});
