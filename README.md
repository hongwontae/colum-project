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


## Liverpool Column Explaination
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

  - 3-1. HomePage Tawilwind

![StartHome 2025-01-15 202906](https://github.com/user-attachments/assets/a889f1e3-78af-4daa-95e0-d0738c6acea3)

<br/>

  - 3-2. HomePage Zustand
  
  Click Button을 누르면 상태가 변경되어 사용자가 원하는 데이터를 얻을 수 있습니다.

![SecondHome 2025-01-15 202946](https://github.com/user-attachments/assets/f5b153ab-5e10-450f-bef6-bbd0cdda2a43)

<br/>

  - 3-3. Login

  로그인 전/후 헤더, Context-API를 통해 전역적으로 로그인 상태 관리
  Admin 유저 로그인 이후 Form을 통해 PlayResult Form, Rating Form 접속과 글쓰기 가능

![스크린샷 2025-01-15 235510](https://github.com/user-attachments/assets/fd7b527f-5d5a-45a9-b599-8f7a3a9114cd)


![스크린샷 2025-01-15 235631](https://github.com/user-attachments/assets/a1ff001a-17eb-45b7-80a5-e2f674b6bed2)





