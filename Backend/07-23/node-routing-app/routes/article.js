// 각종 게시글 정보관리 웹페이지 요청과 응답처리 전용 라우터파일
// article.js 라우터 파일의 기본 주소체계는 app.js 내에서 http://localhost:3000/article 로 정의할 예정입니다.

// express 객체를 참조합니다.
var express = require("express");

// 각종 요청과 응답처리를 위한 라우터 객체 생성하기
var router = express.Router();

// 게시글 목록 웹페이지 요청과 응답처리 라우팅 메소드 정의
// 요청주소: http://localhost:3000/article/list
// router.get() 라우팅 메서드는 클라이언트에서 get 방식으로 요청해야함
// 클라이언트에 get 방식으로 요청하는 방법
// 1) 브라우저 주소창에 url 직접 찍는 경우: <a href="/article/list"> 링크 태그를 사용자가 클릭한 경우
// router.get('호출 주소 체계', 서버응답처리전용콜백함수());
// router.post(위와 동일) router.put(위와 동일) router.patch(위와 동일) router.delete(위와 동일)
router.get("/list", function (req, res) {
  // 콜백함수(req, res, next);
  // 콜백함수(req=요청=HttpRequest 객체=클라이언트/웹브라우저에서 서버로 전달되는 모든 정보 제공 객체)
  // 콜백함수(res=응답=HttpResponse 객체=서버에서 클라이언트/웹브라우저로 응답을 처리하고 그 결과를 보내는 객체)
  // 콜백함수(next=미들웨어로 콜백처리 후에 진행할 흐름제어 객체)

  // res.render('뷰파일 경로'): 특정 지정 뷰파일의 내용을 웹브라우저로 전달하는 메서드
  // views 폴더 아래 article 폴더 아래 list.ejs 파일을 웹브라우저로 전달한다.
  // res.render('뷰파일 경로', 해당 지정 뷰에 전달할 DATA(JSON Data))
  res.render("article/list.ejs");
});

// 게시글 등록 웹페이지 요청과 응답처리 라우팅메서드
// 요청 주소: http://localhost:3000/article/create
// 클라이언트 요청 방식: GET 방식
// 응답 형식: 게시글 등록 웹페이지(뷰파일)
router.get("/create", function (req, res) {
  res.render("article/create.ejs");
});

// 게시글 확인 및 수정 웹페이지 요청과 응답처리 라우팅메서드
// 요청 주소: http://localhost:3000/article/modify
// 클라이언트 요청 방식: GET 방식
// 응답 형식: 단일 게시글 정보 확인 웹페이지(뷰파일)
router.get("/modify", function (req, res) {
  res.render("article/modify.ejs");
});

// 반드시 라우터파일의 라우터 객체를 exports로 노출해야 app.js에서 router 내의 라우팅 규칙을 실행할 수 있습니다.
// ** 절대 까먹지 마세요. exports **
module.exports = router;
