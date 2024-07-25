var express = require("express");
var router = express.Router();

// 공통 기능 미들웨어 참조하기
// middleware.js 모듈에서 제공하는 2개의 미들웨어 함수를 참조합니다.
const { checkParams, checkQuery } = require("./middleware.js");

// 해당 라우터 파일이 호출되면 무조건 실행되는 미들웨어 함수 정의하기
router.use(function (req, res, next) {
  console.log("index.js 라우터 파일이 호출될 때마다 실행되는 기능 구현");
  next();
  // res.send("모든 응답 반환하기");
});

// 특정 주소 호출에 대한 미들웨어 기능 추가
// http://localhost:3000/sample
router.use(
  "/sample",
  function (req, res, next) {
    console.log("index.js 라우터 파일 미들웨어2 호출", req.originalUrl);
    next();
  },
  function (req, res, next) {
    console.log("index.js 라우터 파일 미들웨어3 호출", req.method);
    res.send(req.method);
  }
);

/* 
- 메인 웹페이지 요청과 응답처리 라우팅메서드
- 호출 주소: http://localhost:3000/
- 호출 방식: GET 방식
- 응답 결과: views/index.ejs 뷰파일 웹페이지 내용을 응답 결과로 제공
 */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// 호출 주소 예시: http://localhost:3000/test/1
// checkParams 미들웨어를 요청 이후 응답 전에 먼저 실행하게 하여 특정 로직을 태웁니다.
// router.get 메서드 실행 -> checkParams() 미들웨어 실행 -> 응답콜백함수 실행
router.get("/test/:id", checkParams, async (req, res, next) => {
  res.render("index.ejs", { title: "테스트" });
});

// 호출 주소 예시: http://localhost:3000/product?category=computer&stock=100
router.get("/product", checkQuery, async (req, res, next) => {
  res.render("index.ejs", { title: "테스트" });
});

module.exports = router;
