var express = require("express");
var router = express.Router();

/* 임시 메인 페이지 요청처리 라우팅 메서드 */
router.get("/", async (req, res, next) => {
  res.render("index", { title: "Express" });
});

// 관리자 웹사이트 로그인 화면 요청/응답 라우팅 메서드
// 호출 주소: http://localhost:5001/login
// 호출 방식: GET 방식
// 응답 결과: login.ejs 뷰파일 (로그인 화면 웹페이지 /views/login.ejs)
router.get("/login", async (req, res) => {
  res.render("login.ejs", { layout: false }, { resultMsg: "" });
});

// 관리자 로그인 정보 처리 라우팅 메서드
// 호출 주소: http://localhost:5001/login
// 호출 방식: POST 방식
// 응답 결과: 메인 페이지 이동(http://localhost:5001/main)
router.post("/login", async (req, res) => {
  const userid = req.body.userid;
  const password = req.body.password;

  // id, password 체크 후 결과 확인
  const result = false;

  if (result) {
    // 정상 로그인 시
    res.redirect("/main");
  } else {
    // 아이디 또는 암호가 틀리면 다시 로그인 페이지 반환
    res.render("login.ejs", { resultMsg: "로그인 실패" });
  }
});

// 메인페이지 요청/응답 라우팅 메서드
// 호출 주소: http://localhost:5001/main
// 호출 방식: GET 방식
// 응답 결과: main.ejs 뷰파일(메인 웹페이지 /views/main.ejs)
router.get("/main", async (req, res) => {
  res.render("main.ejs");
});

module.exports = router;
