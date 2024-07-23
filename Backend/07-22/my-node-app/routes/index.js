var express = require("express");
var router = express.Router();

/* 메인 웹페이지 요청과 응답처리 라우팅 메서드
호출주소: https://localhost:3000/
*/
router.get("/", function (req, res, next) {
  // 서버에서 사용자 웹브라우저로 응답결과물을 반환합니다.
  // 지정된 뷰파일 내 웹페이지가 반환됩니다.
  // res.render('뷰파일경로'. 뷰파일에 전달하는 JSON 데이터);
  res.render("index.ejs", { title: "홈페이지123" });
});

module.exports = router;
