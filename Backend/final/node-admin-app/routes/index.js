var express = require("express");
var router = express.Router();

/* 임시 메인 페이지 요청처리 라우팅 메서드 */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// 관리자 웹사이트 로그인 화면 요청/응답 라우팅 메서드
// 호출 주소: http://localhost:5001/login
// 호출 방식: GET 방식
// 응답 결과: login.ejs 뷰파일 (로그인 화면 웹페이지 /views/login.ejs)
router.get("/login", function (req, res) {
  res.render("login.ejs");
});

// 관리자 웹사이트 로그인 정보 처리 라우팅 메서드
// 호출 주소: http://localhost:5001/login
// 호출 방식: POST 방식
// 응답 결과: 메인 페이지 이동(http://localhost:5001/main)
router.post("/login", function (req, res) {
  res.redirect("/main");
});

// 메인페이지 요청/응답 라우팅 메서드
// 호출 주소: http://localhost:5001/main
// 호출 방식: GET 방식
// 응답 결과: main.ejs 뷰파일(메인 웹페이지 /views/main.ejs)
router.get("/main", function (req, res) {
  res.render("main.ejs");
});

module.exports = router;
