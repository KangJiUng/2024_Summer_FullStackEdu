// article.js 라우터 파일은 게시글 관련 각종 웹페이지들에 대한 요청과 응답을 처리한다.
// 본 라우터 파일의 기본 호출 주소는 http://localhost:3000/article 로 시작하도록
// app.js 에서 라우터 파일 참조 시 기본 주소를 설정해준다.
var express = require("express");
var router = express.Router();

/*
- 게시글 목록 웹페이지 요청과 응답처리 라우팅 메서드 구현
- 호출 주소: http://localhost:3000/article/list
- 호출 방식: GET 방식
- 응답 결과: 게시글 목록 데이터를 기반으로 한 게시글 목록 웹페이지 전달
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

/*
- 신규 게시글 등록 웹페이지 요청과 응답처리 라우팅 메서드 구현
- 호출 주소: http://localhost:3000/article/create
- 호출 방식: GET 방식
- 응답 결과: 게시글 등록 웹페이지 뷰파일 전달
*/
router.get("/create", async (req, res) => {
  res.render("article/create.ejs");
});

/*
- 신규 게시글 등록 웹페이지에서 보내준 사용자가 입력/선택한 신규 게시글 데이터를 등록 처리 요청과 응답처리 라우팅 메서드 구현
- 호출 주소: http://localhost:3000/article/create
- 호출 방식: POST 방식
- 응답 결과: 신규 게시글 DB 등록 처리 후 특정 페이지로 이동 또는 특정 뷰파일 제공
- ** 라우팅 주소와 요청 방식 2가지가 동일해야 해당 라우팅 메서드가 호출되고 실행된다. **
*/
router.post("/create", async (req, res) => {
  // Step1: 사용자가 입력한 폼태그 내 입력/선택 데이터 추출하기
  // req.body.전달되는 폼태그 내 html 입력/선택 요소의 name 속성명
  const title = req.body.title;
  const contents = req.body.contents;
  const display = req.body.display;

  // Step2: DB 게시글 테이블에 저장할 JSON 데이터 생성하기
  // 객체 속성명과 속성의 데이터값 변수/상수명이 같으면 상수/변수명은 생략가능하다.
  var article = {
    title: title,
    contents: contents,
    display: display,
    ip_address: "111.111.111.111",
    view_cnt: 0,
    regist_id: 1,
    regist_date: Date.now(),
  };

  // Step3: DB 게시글 테이블에 상기 article 데이터 등록 처리(Insert Into Table명...)
  // DB 서버에서 Insert SQL 구문을 통해서 DB등록처리가 되면 등록된 실제 데이터셋을 다시 반환한다.
  const registedArticle = {
    article_id: 1,
    title: title,
    contents: contents,
    display: display,
    ip_address: "111.111.111.111",
    view_cnt: 0,
    regist_id: 1,
    regist_date: Date.now(),
  };

  // Step4: 등록 완료 후 게시글 목록 페이지로 이동시킨다.
  // http://localhost:3000/article/list
  res.redirect("/article/list");
});

/*
- 기존 게시글을 수정한 사용자 폼에 대한 게시글 데이터 수정처리 요청과 응답처리 라우팅 메서드
- 호출 주소: http://localhost:3000/article/modify
- 호출 방식: POST 방식
- 응답 결과: 기존 게시글 정보를 수정처리하고 목록페이지로 이동시킨다.
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
  res.redirect("/article/list");
});

/*
- 기존 게시글 데이터 삭제처리 요청과 응답처리 라우팅 메서드
- 호출 주소: http://localhost:3000/article/delete?aid=1
- 호출 방식: GET 방식
- 응답 결과: 해당 게시글을 삭제처리하고 목록페이지로 이동시킨다.
*/
router.get("/delete", async (req, res) => {
  // Step1:  쿼리스트링방식을 사용해 req.query.키명으로 전달된 데이터 추출
  const articleIdx = req.query.aid;

  // Step2: 데이터 삭제 처리

  // Step3: 사용자 브라우저 게시글 목록 이동처리
  res.redirect("/article/list");
});

/*
- 기존 등록된 게시글 데이터를 조회해서 게시글 수정 웹페이지에 데이터를 포함한 웹페이지 요청과 응답처리 라우팅 메서드
- 호출 주소: http://localhost:3000/article/modify/1
- 호출 방식: GET 방식
- 응답 결과: DB에서 해당 단일 게시글 정보를 조회해와서 지정 뷰파일에 데이터를 전달하고 뷰파일 내에서 
            해당 데이터를 HTML 태그에 출력하여 최종 웹브라우저에 동적으로 변경된 웹페이지를 반환한다.
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
  res.render("article/modify.ejs", { article });
});

module.exports = router;
