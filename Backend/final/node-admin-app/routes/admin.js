var express = require("express");
var router = express.Router();

// 관리자 계정 목록 화면 요청/응답 라우팅 메서드
// 호출 주소: http://localhost:5001/admin/list
// 호출 방식: GET 방식
// 응답 결과: list.ejs 뷰파일(관리자 계정목록 웹페이지 /views/admin/list.ejs)
router.get("/list", async (req, res) => {
  res.render("admin/list.ejs");
});

// 관리자 계정 정보 등록 화면 요청/응답 라우팅 메서드
// 호출 주소: http://localhost:5001/admin/create
// 호출 방식: GET 방식
// 응답 결과: create.ejs 뷰파일(관리자 계정목록 웹페이지 /views/admin/create.ejs)
router.get("/create", async (req, res) => {
  res.render("admin/create");
});

// 관리자 계정 정보 등록 화면 요청/응답 라우팅 메서드
// 호출 주소: http://localhost:5001/admin/create
// 호출 방식: POST 방식
// 응답 결과: 관리자 계정 목록 페이지로 이동(http://localhost:5001/admin/list)
router.post("/create", async (req, res) => {
  const id = req.body.id;
  const pw = req.body.pw;
  const code = req.body.code;

  res.redirect("/admin/list");
});

/*
- 관리자 계정 정보 수정 처리 요청과 응답처리 라우팅 메서드
- 호출 주소: http://localhost:5001/admin/modify
- 호출 방식: POST 방식
- 응답 결과: 기존 관리자 정보를 수정처리하고 목록페이지로 이동시킨다.
*/
router.post("/modify", async (req, res) => {
  const id = req.body.id;
  const pw = req.body.pw;
  const code = req.body.code;

  res.redirect("/admin/list");
});

/*
- 기존 관리자 데이터 삭제처리 요청과 응답처리 라우팅 메서드
- 호출 주소: http://localhost:5001/admin/delete?aid=1
- 호출 방식: GET 방식
- 응답 결과: 해당 게시글을 삭제처리하고 목록페이지로 이동시킨다.
*/
router.get("/delete", async (req, res) => {
  // Step1:  쿼리스트링방식을 사용해 req.query.키명으로 전달된 데이터 추출
  const articleIdx = req.query.aid;

  // Step2: 데이터 삭제 처리

  // Step3: 사용자 브라우저 게시글 목록 이동처리
  res.redirect("/admin/list");
});

/*
- 기존 등록된 관리자 데이터를 조회해서 관리자정보 수정 웹페이지에 데이터를 포함한 웹페이지 요청과 응답처리 라우팅 메서드
- 호출 주소: http://localhost:5001/admin/modify/1
- 호출 방식: GET 방식
- 응답 결과: 
*/
// 와일드카드 키명을 사용하기 때문에 제일 마지막에 구현
router.get("/modify/:id", async (req, res) => {
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
