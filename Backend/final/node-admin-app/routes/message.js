var express = require("express");
var router = express.Router();

// 채팅 메시지 이력 조회/목록 화면 요청/응답 라우팅 메서드
// 호출 주소: http://localhost:5001/message/list
// 호출 방식: GET 방식
// 응답 결과: list.ejs 뷰파일(관리자 계정목록 웹페이지 /views/message/list.ejs)
router.get("/list", async (req, res) => {
  res.render("message/list.ejs");
});

module.exports = router;
