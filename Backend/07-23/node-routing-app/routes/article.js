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

// 게시글 등록 페이지에서 폼 방식으로 보내준 사용자 입력 게시글 정보를 추출하여 DB에 저장처리하는 라우팅 메서드 구현
// 요청 주소: http://localhost:3000/article/create
// 클라이언트 요청 방식: POST 방식
// ** 서버측 라우팅 메서드는 호출 주소 URL과 클라이언트 요청방식이 둘 다 동일해야 해당 라우팅 메서드가 실행됨 **
router.post("/create", function (req, res) {
  // Step1: 사용자 게시글 등록폼 태그 내 입력/선택 값 추출하기
  // 사용자 입력폼 내 입력/선택 html 요소 태그의 값을 추출하려면 req.body.html태그 요소의 name 속상값을 이용해 추출합니다.
  // req=HttpRequest객체=요청 정보 담고 있는 클라이언트/웹브라우저에서 서버로 전달되는 모든 정보를 담고 있는 객체
  const title = req.body.title;
  const contents = req.body.contents;
  const display = req.body.display;

  // Step2: DB에 저장한 JSON 데이터 생성하기
  // 객체의 속성명과 속성에 할당되는 변수명이 같으면 변수명은 생략 가능하다.
  const article = {
    title, // 제목
    contents,
    display,
    view_cnt: 0,
    ipaddress: "111.111.111.111",
    regist_date: Date.now(),
    regist_id: 1,
  };

  // Step3: DB에 관련 게시글 테이블에 데이터를 저장한다.

  // Step4: 사용자 웹브라우저를 게시글 목록페이지로 바로 이동시킨다.
  // res.redirect('이동시키고자하는 URL 주소 ex) http://www.naver.com');
  res.redirect("/article/list"); // res.redirect("http://localhost:3000/article/list"); 와 동일
});

// 게시글 확인 및 수정 웹페이지 요청과 응답처리 라우팅메서드
// 요청 주소: http://localhost:3000/article/modify?id=
// 클라이언트 요청 방식: GET 방식
// 응답 형식: 단일 게시글 정보 확인 웹페이지(뷰파일)
router.get("/modify", function (req, res) {
  // URL 주소를 통해 데이터를 전달하는 방법 2가지
  // 1) QueryString 방식: URL 주소에 ?키=값&키=값&키=값
  // 예시: http://shop.naver.com/category?ptype=tv&manufacture=lg&price=5000 or http://test.co.kr/blogs?id=1

  // 2) parameter 방식: URL 주소 내에 데이터를 포함시키는 방식
  // 첫 번째 방식에 비해 검색 엔진에 더 잘 노출되는 방식
  // 예시: http://test.co.kr/blogs/1 or http://test.co.kr/category/1/goods/2000

  // Step1: URL 주소에서 게시글 고유 번호를 추출한다.
  // querystring 방식으로 전달되는 키값은 req.query.키명으로 추출한다.
  const articleIdx = req.query.id;

  // Step2: 해당 게시글 번호를 이용해 DB 게시글 테이블에서 단일 게시글 정보를 조회해온다.
  // 언제? 나중에...
  // 예시: 아래 데이터를 DB에서 불러왔다는 가정 하에...
  const article = {
    article_id: 1,
    title: "웹퍼블리셔의 업무에 대해 궁금해요.",
    contents:
      "웹퍼블리셔의 주요 업무 2가지는 웹표준준수코딩, 웹접근성준수, 반응형 웹페이지 구현 등등...",
    display: 1,
    view_cnt: 100,
    regist_date: "2024-07-23",
    regist_id: 1,
  };

  // 지정된 뷰파일에 단일 게시글 데이터를 article이라는 속성명으로 전달한다.
  res.render("article/modify.ejs", { article }); // 객체의 속성명과 변수값이 동일하므로 변수명 생략
});

// 반드시 라우터파일의 라우터 객체를 exports로 노출해야 app.js에서 router 내의 라우팅 규칙을 실행할 수 있습니다.
// ** 절대 까먹지 마세요. exports **
module.exports = router;
