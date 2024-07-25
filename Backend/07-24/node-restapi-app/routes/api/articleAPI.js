// articleAPI.js 라우터의 기본 주소는 app.js에서 http://localhost:3000/api/articles 로 설정해줍니다.

var express = require("express");
var router = express.Router();

/*
- 전체 게시글 목록 데이터 요청과 응답처리 라우팅 메서드
- 호출 주소: http://localhost:3000/api/articles/list
- 호출 방식: GET 방식
- 응답 결과: 게시글 JSON 데이터 목록
*/
// router.get("호출주소", 콜백함수());
// async(req, res) => {} 비동기 콜백함수로 선언하면 비동기 기반에서도 순차적 프로그래밍이 가능합니다.
router.get("/list", async (req, res) => {
  // API 호출 결과 표준 데이터 포맷 정의
  let apiResult = {
    code: 200,
    data: null,
    result: "",
  };

  try {
    // DB 게시글 테이블에서 전체 게시글 목록을 가져왔다고 가정합니다.
    // 가져온 데이터가 아래와 같아요.
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

    apiResult.code = 200;
    apiResult.data = articles;
    apiResult.result = "OK";
  } catch (err) {
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.result = "Failed Server Error. 관리자에게 문의하세요.";
  }

  // 서버응답결과물로 순수 JSON 데이터를 반환한다.
  // res.json(json데이터);
  res.json(apiResult);
});

/*
- 단일 신규 게시글 정보 등록 요청과 응답처리 라우팅 메서드
- 호출 주소: http://localhost:3000/api/articles/create
- 호출 방식: POST 방식
- 응답 결과: 등록처리 완료된 단일 게시글 정보 반환(여기는 게시글 번호가 존재)
*/
router.post("/create", async (req, res) => {
  // API 호출 결과 표준 데이터 포맷 정의
  let apiResult = {
    code: 200,
    data: null,
    result: "",
  };

  // 백엔드 예외처리하기
  try {
    // Step1: 클라이언트에서 보내준 사용자 입력 json 데이터를 추출합니다.
    // req.body.클라이언트에서 보내준 단일 게시글 json 객체의 속성명
    const title = req.body.title; // 글 제목
    const contents = req.body.contents; // 글 내용
    const display = req.body.display; // 게시 여부

    // Step2: 사용자 json 데이터를 DB 게시글 테이블에 저장합니다.
    // DB 게시글 테이블에 저장할 JSON 단일 데이터
    const article = {
      title: title,
      contents: contents,
      display: display,
      view_cnt: 0,
      ip_address: "111.111.111.111",
      regist_id: 1,
      regist_date: Date.now(),
    };

    // DB 게시글 테이블에 상기 데이터를 저장한다.
    // 저장하면 DB에 저장된 게시글 정보가 다시 반환됩니다.(게시글 번호가 포함)
    // Step3: DB에 저장 반환된 등록된 게시글 신규 게시글 정보가 반환됩니다.(가정)
    const dbArticle = {
      article_id: 1,
      title: title,
      contents: contents,
      display: display,
      view_cnt: 0,
      ip_address: "111.111.111.111",
      regist_id: 1,
      regist_date: Date.now(),
    };

    apiResult.code = 200;
    apiResult.data = dbArticle;
    apiResult.result = "OK";
  } catch (err) {
    // try{} 블록 스코프 내에서 백엔드 에러가 발생하면 catch(err) {} 블록으로 에러 내용이 전달됩니다.
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.result = "Server Error. 관리자에게 문의하세요.";
  }

  // Step4: DB에 저장되고 반환된 단일 게시글 정보를 클라이언트에 반환합니다.
  // HttpResponse 객체의 json('json데이터') 메서드는 서버에서 웹브라우저로 json 데이터를 반환합니다.
  res.json(apiResult);
});

/*
- 기존 단일 게시글 정보 조회 요청과 응답처리 라우팅 메서드 (**쿼리스트링 방식)
- 호출 주소: http://localhost:3000/api/articles/?aid=1
- 호출 방식: GET 방식
- 응답 결과: 단일 게시글 정보 JSON 반환
*/
router.get("/", async (req, res) => {
  // API 호출 결과 표준 데이터 포맷 정의
  let apiResult = {
    code: 200, // 처리결과 상태 코드
    data: null, // 반환할 데이터가 있으면 여기에 전달
    result: "", // 서버에서 프론트로 특정 메시지를 보내고 싶으면 여기에...
  };

  try {
    // Step1: API URL 주소에서 게시글 번호를 추출한다.
    // 쿼리스트링 방식으로 전달되는 키값은 req.query.키명으로 추출가능하다.
    const articleIdx = req.query.aid;

    // Step2: 해당 게시글 번호를 기준으로 DB 게시글 테이블에서 단일 게시글 정보를 조회한다.
    // DB에서 조회해 온 값이 단일 게시글 정보라고 가정합니다.
    const article = {
      article_id: 1,
      title: "게시글 제목1입니다.",
      contents: "게시글1 내용입니다. - 쿼리스트링 방식",
      display: 1,
      view_cnt: 10,
      ip_address: "111.111.111.111",
      regist_id: 1,
      regist_date: Date.now(),
    };
    apiResult.code = 200;
    apiResult.data = article;
    apiResult.result = "OK";
  } catch (err) {
    console.log("실제 서버 에러 확인하기:", err.message);

    // 백엔드에서 에러가 난 사실을 서버에 물리적 로그 폴더를 만들고 로그.txt(.log) 파일에 기록하면
    // 좀 더 적극적으로 서버 에러에 대해 대응이 가능합니다.

    apiResult.code = 500;
    apiResult.data = null;
    apiResult.result = "Server Error. 관리자에게 문의하세요.";
  }

  // Step3: 단일 게시글 정보를 웹브라우저/클라이언트 응답결과물로 반환한다.
  res.json(apiResult);
});

/*
- 기존 단일 게시글 정보 조회 요청과 응답처리 라우팅 메서드 (**파라미터 방식)
- 호출 주소: http://localhost:3000/api/articles/1
- 호출 방식: GET 방식
- 응답 결과: 단일 게시글 정보 JSON 반환
*/
router.get("/:aid", async (req, res) => {
  // API 호출 결과 표준 데이터 포맷 정의
  let apiResult = {
    code: 200, // 처리결과 상태 코드
    data: null, // 반환할 데이터가 있으면 여기에 전달
    result: "", // 서버에서 프론트로 특정 메시지를 보내고 싶으면 여기에...
  };

  try {
    // Step1: API URL 주소에서 게시글 번호를 추출한다.
    // 파라미터 방식으로 전달되는 키값은 와일드카드(:aid) 키값을 이용해
    // req.params.와일드카드키명으로 추출가능하다.
    const articleIdx = req.params.aid;

    // Step2: 해당 게시글 번호를 기준으로 DB 게시글 테이블에서 단일 게시글 정보를 조회한다.
    // DB에서 조회해 온 값이 단일 게시글 정보라고 가정합니다.
    const article = {
      article_id: 1,
      title: "게시글 제목1입니다.",
      contents: "게시글1 내용입니다. - 파라미터 방식",
      display: 1,
      view_cnt: 10,
      ip_address: "111.111.111.111",
      regist_id: 1,
      regist_date: Date.now(),
    };
    apiResult.code = 200;
    apiResult.data = article;
    apiResult.result = "OK";
  } catch (err) {
    console.log("실제 서버 에러 확인하기:", err.message);

    // 백엔드에서 에러가 난 사실을 서버에 물리적 로그 폴더를 만들고 로그.txt(.log) 파일에 기록하면
    // 좀 더 적극적으로 서버 에러에 대해 대응이 가능합니다.

    apiResult.code = 500;
    apiResult.data = null;
    apiResult.result = "Server Error. 관리자에게 문의하세요.";
  }

  // Step3: 단일 게시글 정보를 웹브라우저/클라이언트 응답결과물로 반환한다.
  res.json(apiResult);
});

module.exports = router;
