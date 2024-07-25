// article.js 라우터 파일은 게시글 관련 각종 웹페이지들에 대한 요청과 응답을 처리한다.
// 본 라우터 파일의 기본 호출 주소는 http://localhost:3000/article 로 시작하도록
// app.js 에서 라우터 파일 참조 시 기본 주소를 설정해준다.
var express = require("express");
var router = express.Router();

/*
- 게시글 목록 웹페이지 요청과 응답처리 라우팅 메서드 구현
- 호출 주소: http://localhost:3000/article/list
- 호출 방식: GET 방식
*/
router.get("/list", async (req, res) => {
  // 게시글 데이터 목록 3개 생성-추후 DB에서 데이터를 가져옵니다.
  const articles = [
    {
      article_id: 1,
      title: "게시글 제목1입니다.",
      contents: "게시글1 내용입니다.",
      display: 1,
      view_cnt: 10,
      ip_address: "111.111.111.111",
      regist_id: 1,
      regist_date: Date.now(),
    },
    {
      article_id: 2,
      title: "게시글 제목2입니다.",
      contents: "게시글2 내용입니다.",
      display: 0,
      view_cnt: 11,
      ip_address: "222.111.111.111",
      regist_id: 2,
      regist_date: Date.now(),
    },
    {
      article_id: 3,
      title: "게시글 제목3입니다.",
      contents: "게시글3 내용입니다.",
      display: 1,
      view_cnt: 30,
      ip_address: "333.111.111.111",
      regist_id: 3,
      regist_date: Date.now(),
    },
  ];

  // 물리적 경로: views/article/list.ejs 경로
  res.render("article/list.ejs", { articles }); // { 속성명 : 변수명 } 에서 속성명=변수명이어서 변수명 생략
});

module.exports = router;
