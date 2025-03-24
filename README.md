# Liverpool Column Project
**React와 Node.js를 통해 개발한 리버풀 축구 클럽 Column Project입니다.**

## Programming Language
&nbsp;&nbsp;&nbsp;![Badge](https://img.shields.io/badge/JavaScript-F7DF1E.svg?&logo=JavaScript&logoColor=fff)
![Badge](https://img.shields.io/badge/Node.js-5FA04E.svg?&logo=Node.js&logoColor=fff)
![Badge](https://img.shields.io/badge/React-61DAFB.svg?&logo=React&logoColor=fff)

## Project Goals
1. 웹 페이지들의 가시성
2. 각 Page들의 통일성
3. 프론트엔드와 백엔드 동시 구축
4. 프로젝트 독립적으로 구성


## Liverpool Column Explanation
1. **Front File Structure**
- src/components : src/page 모듈 컴포넌트
- src/context : 전체 페이지 로그인 상태 Context-API 파일
- src/data : HomePage 정적 데이터
- src/favicon : <head> <link> icon images
- src/page : React Router를 통해 분리한 페이지
- src/util : 날짜 관련 함수
- src/zustand-store : Zustand 상태 관리 파일 (homepage 관련)

![스크린샷 2025-01-15 201249](https://github.com/user-attachments/assets/745940ca-5872-4ecf-a88a-38b2556286ab)

2. **Front Settings**
- Tawilwind
- React Router
- Zustand
- Context-API


3. **Features**

  - 3-1. **HomePage Tawilwind**

![StartHome 2025-01-15 202906](https://github.com/user-attachments/assets/a889f1e3-78af-4daa-95e0-d0738c6acea3)

<br/>

  - 3-2. **HomePage Zustand**
  
  Click Button을 누르면 상태가 변경되어 사용자가 원하는 데이터를 얻을 수 있습니다.

![SecondHome 2025-01-15 202946](https://github.com/user-attachments/assets/f5b153ab-5e10-450f-bef6-bbd0cdda2a43)

<br/>

  - 3-3. **Login**

  로그인 전/후 헤더, Context-API를 통해 전역적으로 로그인 상태 관리
  
  Admin 유저 로그인 이후 Form을 통해 PlayResult Form, Rating Form 접속과 글쓰기 가능

![스크린샷 2025-01-15 235510](https://github.com/user-attachments/assets/fd7b527f-5d5a-45a9-b599-8f7a3a9114cd)


![스크린샷 2025-01-15 235631](https://github.com/user-attachments/assets/a1ff001a-17eb-45b7-80a5-e2f674b6bed2)

<br/>

  - 3-4. **Play Result Form Page**

  경기 결과 내용을 기록할 수 있는 페이지 => 로그인 된 admin만 접근 가능

  Image Picker => 올린 사진을 Preview로 볼 수 있는 기능

![스크린샷 2025-01-16 155350](https://github.com/user-attachments/assets/0b15e61c-8858-4936-b332-881b6b2916f5)

<br/>

![ImagePicker before 2025-01-16 155513](https://github.com/user-attachments/assets/c3c4afbf-34b3-4db3-a009-507b6ddb1620) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
![Image Picker After 2025-01-16 155528](https://github.com/user-attachments/assets/8e0ce79a-6f3d-4e7f-baa9-f5305bcff7f6)

<br/>

  -3-5. **Play Result Page, Play Result Detail Page**

  admin이 작성한 경기 총평을 볼 수 있는 Page

  Result Page는 Pagination, 내림차순 정렬/ Detail Page는 경기 총평을 자세히 볼 수 있는 페이지

  ![Pagination-1 2025-01-16 170420](https://github.com/user-attachments/assets/84ae4a40-5aed-45f0-ab4b-f5b1f7b8e494)

![pagination-2 2025-01-16 170430](https://github.com/user-attachments/assets/a4563efa-9fa1-4f4e-b9c0-2d7b42d8242d)  

![result-detail 2025-01-16 170444](https://github.com/user-attachments/assets/4e78fdea-95f1-4a37-a16c-49920f9bd7c6)


4. **그 외 기능**
  - 4-1. 선수 평점 총평 form page/ view page
  - 4-2. 로그인 시 수정, 삭제 기능 추가
  - 4-3. 자동 로그 아웃 기능 (일정 시간 이후)
  - 4-3. form에서 서버로 보낼 떄 인증 기능
  - ....


## NodeJS 서버
1. **Sequelize**
 - Preview

  ```javascript
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
  ```

2. **Express-Validator**
 - Preview

  ```javascript
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
    }),....
  ```

3. **JSON Authentication**
  - Preview

  ```javascript
exports.generalProtection = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json({ jStatus: false, message: "token이 존재하지 않습니다." });
  }

  JWT.verify(token, SECRET_KEY, (tErr, decoded) => {
    if (tErr) {
      const err = new Error();
      err.status = false;
      err.location = 'jwt'
      err.message = "token verify 중에 에러가 발생했습니다.";
      err.object = tErr;
      return next(err);
    }

    return res.json({jStatus : true, message : 'JWT'})
  });
};
  ```

4. Multer
 - Preview

  ```javascript
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
  ```

5. Cors

- Preview

```javascript
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
```

- 기타
  - 1. error Handling(next(error))
  - 2. cookie-parser
  - 3. 관리자 생성 보안
  ...



