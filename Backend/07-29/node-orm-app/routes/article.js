// article.js 라우터 파일의 기본 주소는 app.js에서 참조시 http://localhost:3000/article 기본 주소가 설정되도록 처리합니다.
var express = require("express");
var router = express.Router();

// DB프로그래밍을 위한 ORM DB 객체 참조하기
var db = require("../models/index");
const { where } = require("sequelize");

// 게시글 전체목록조회 웹페이지 요청과 응답처리 라우팅메서드
// 호출주소: http://localhost:3000/article/list
// 호출방식: GET 방식
// 응답결과: 전체 게시글 목록이 포함된 웹페이지 반환
router.get("/list", async (req, res) => {
  // 전체 게시글 목록 조회하기
  const articles = await db.Article.findAll();

  res.render("article/list.ejs", { articles });
});

// 신규 게시글 등록 웹페이지 요청과 응답처리 라우팅메서드
router.get("/create", async (req, res) => {
  res.render("article/create.ejs");
});

// 신규 게시글 입력정보 등록처리 요청과 응답처리 라우팅메서드
router.post("/create", async (req, res) => {
  // Step1: 신규 게시글 등록폼에서 사용자가 입력/선택한 값을 추출
  const title = req.body.title;
  const contents = req.body.contents;
  const is_display_code = req.body.display;

  // Step2: article 테이블에 등록할 JSON 데이터 생성
  // 주의/중요: 반드시 JSON 데이터 속성명은 article.js모델의 속성명과 일치해야한다.
  const article = {
    board_type_code: 1,
    title: title,
    article_type_code: 0,
    contents: contents,
    view_count: 0,
    ip_address: "123.111.111.111",
    is_display_code: is_display_code,
    reg_date: Date.now(),
    reg_member_id: 1,
  };

  // Step3: 준비된 신규 게시글 데이터를 article 테이블에 저장한다.
  // create() 메서드는 ORM Framework에 의해 INSERT INTO article()values() 쿼리로 변환되어
  // DB 서버에 전송되고, DB 서버에서 실행되어 실제 저장된 단일 게시글 DATA를 DB 서버에서 반환한다.
  const registedArticle = await db.Article.create(article);

  console.log("실제 DB article 테이블에 저장된 데이터 확인:", registedArticle);

  // 신규 게시글 DB 등록 처리 후 목록페이지로 이동
  res.redirect("/article/list");
});

// 기존 단일 게시글 수정처리 요청과 응답처리 라우팅메서드
router.post("/modify", async (req, res) => {
  // Step1: 사용자가 수정한 데이터를 추출한다.
  // 게시글 고유번호 추출하기
  const articleIdx = req.body.article_id; // html hidden tag에서 추출한다.

  const title = req.body.title;
  const contents = req.body.contents;
  const is_display_code = req.body.display;

  // Step2: 수정할 JSON 데이터를 생성한다.
  // 주의/중요: 수정할 컬럼과 값만 지정하고 컬럼의 속성은 article.js 모델의 속성명과 일치해야한다.
  const article = {
    title,
    contents,
    is_display_code,
    ip_address: "222.222.222.222",
    edit_date: Date.now(),
    edit_member_id: 1,
  };

  // 수정된 데이터 건수가 결과값으로 전달된다.
  const updatedCnt = await db.Article.update(article, {
    where: {
      article_id: articleIdx,
    },
  });

  // 기존 게시글 DB 수정 처리 후 목록페이지로 이동
  res.redirect("/article/list");
});

// 기존 단일 게시글 삭제처리 요청과 응답처리 라우팅메서드
// http://localhost:3000/article/delete?id=1
router.get("/delete", async (req, res) => {
  // Step1: 삭제할 게시글 고유번호 추출하기
  const articleIdx = req.query.id;

  // Step2: 해당 게시글 삭제하기
  const deletedCnt = await db.Article.destroy({
    where: { article_id: articleIdx },
  });

  // 기존 게시글 DB 삭제 처리 후 목록페이지로 이동
  res.redirect("/article/list");
});

// 기존 단일 게시글 정보 조회 확인 웹페이지 요청과 응답처리 라우팅메서드
// http://localhost:3000/article/modify/1
router.get("/modify/:id", async (req, res) => {
  // Step1: 현재 게시글 고유번호를 추출한다.
  const articleIdx = req.params.id;

  // Step2: 해당 게시글 번호를 기준으로 단일 게시글 정보를 조회한다.
  // SELECT * FROM article WHERE article_id = 1; 와 같은 SQL 구문이 백엔드에서 생성되어
  // DB 서버로 전송되고 실행되며, 그 결과를 백엔드에서 반환받는다.
  const article = await db.Article.findOne({
    where: { article_id: articleIdx },
  });

  // DB에서 해당 게시글 번호와 일치하는 단일 게시글 정보 조회
  res.render("article/modify.ejs", { article });
});

module.exports = router;
