var express = require("express");
var router = express.Router();

// 사용자 계정 목록 화면 요청/응답 라우팅 메서드
// 호출 주소: http://localhost:5001/member/list
// 호출 방식: GET 방식
// 응답 결과: list.ejs 뷰파일(사용자 계정 목록 웹페이지 /views/member/list.ejs)
router.get("/list", async (req, res) => {
  res.render("member/list.ejs");
});

// 사용자 계정 수정 화면 요청/응답 라우팅 메서드
// 호출 주소: http://localhost:5001/member/modify
// 호출 방식: GET 방식
// 응답 결과: modify.ejs 뷰파일(사용자 계정 목록 웹페이지 /views/member/modify.ejs)
router.get("/modify", async (req, res) => {
  res.render("member/modify.ejs");
});

/*
- 관리자 계정 정보 수정 처리 요청과 응답처리 라우팅 메서드
- 호출 주소: http://localhost:5001/member/modify
- 호출 방식: POST 방식
- 응답 결과: 기존 관리자 정보를 수정처리하고 목록페이지로 이동시킨다.
*/
router.post("/modify", async (req, res) => {
  // Step1: 사용자 수정 데이터를 추출하고 수정할 데이터 소스를 생성합니다.

  // 수정할 대상이 되는 게시글 고유번호
  const articleIdx = req.body.article_id; // hidden 태그의 name 속성값

  // 실제 수정할 데이터 항목별 값 세팅하기
  const article = {
    title: req.body.title,
    contents: req.body.contents,
    display: req.body.display,
    modify_id: 1,
    modify_date: Date.now(),
  };

  // Step2: DB 게시글 테이블의 특정 게시글 번호를 기준으로 게시글 정보를 수정처리합니다.
  // Update article Set title='수정한 제목', contents='수정한 내용', display='게시여부값, modify_id=1, modify_date='2024-07-25 18:08:12' WHERE article_id=1;

  // 수정이 완료되면 DB 서버에서 수정처리건수가 반환된다.

  // Step3: 게시글 목록 페이지로 이동처리
  res.redirect("/admin/list");
});

/*
- 기존 관리자 데이터 삭제처리 요청과 응답처리 라우팅 메서드
- 호출 주소: http://localhost:5001/member/delete?aid=1
- 호출 방식: GET 방식
- 응답 결과: 해당 게시글을 삭제처리하고 목록페이지로 이동시킨다.
*/
router.get("/delete", async (req, res) => {
  // Step1:  쿼리스트링방식을 사용해 req.query.키명으로 전달된 데이터 추출
  const articleIdx = req.query.aid;

  // Step2: 데이터 삭제 처리

  // Step3: 사용자 브라우저 게시글 목록 이동처리
  res.redirect("/member/list");
});

/*
- 기존 등록된 관리자 데이터를 조회해서 관리자정보 수정 웹페이지에 데이터를 포함한 웹페이지 요청과 응답처리 라우팅 메서드
- 호출 주소: http://localhost:5001/member/modify/1
- 호출 방식: GET 방식
- 응답 결과: 
*/
// 와일드카드 키명을 사용하기 때문에 제일 마지막에 구현
router.get("/modify/:idx", async (req, res) => {
  // Step1: URL 주소에서 게시글 고유 번호를 추출합니다.
  const articleIdx = req.params.idx;

  // Step2: DB 게시글 테이블에서 해당 게시글 고유번호에 해당하는 단일 게시글 정보를 조회해 옵니다.
  // 조회해 왔다고 가정합니다.
  const article = {
    article_id: 1,
    title: "게시글 제목1입니다.",
    contents: "게시글1 내용입니다.",
    display: 1,
    view_cnt: 10,
    ip_address: "111.111.111.111",
    regist_id: 1,
    regist_date: Date.now(),
  };

  // Step3: DB에서 가져온 단일 게시글 정보를 modify.ejs 뷰파일에 전달합니다.
  res.render("admin/modify.ejs", { article });
});

module.exports = router;
