var express = require("express");
var router = express.Router();

// 관리자 계정 목록 화면 요청/응답 라우팅 메서드
// 호출 주소: http://localhost:5001/admin/list
// 호출 방식: GET 방식
// 응답 결과: list.ejs 뷰파일(관리자 계정목록 웹페이지 /views/admin/list.ejs)
router.get("/list", function (req, res) {
  res.render("admin/list.ejs");
});

// 관리자 계정 등록 화면 요청/응답 라우팅 메서드
// 호출 주소: http://localhost:5001/admin/create
// 호출 방식: GET 방식
// 응답 결과: list.ejs 뷰파일(관리자 계정목록 웹페이지 /views/admin/create.ejs)
router.get("/create", function (req, res) {
  res.render("admin/create.ejs");
});

// 관리자 계정 정보 등록 화면 요청/응답 라우팅 메서드
// 호출 주소: http://localhost:5001/admin/create
// 호출 방식: POST 방식
// 응답 결과: 관리자 계정 목록 페이지로 이동(http://localhost:5001/admin/list)
router.post("/create", function (req, res) {
  res.redirect("/admin/list");
});

module.exports = router;
