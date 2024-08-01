// 일반회원 정보를 위한 각종 요청과 응답처리 제공 라우터 파일
// 기본호출주소: http://localhost:5000/api/member
// 기본호출주소 정의는 app.js에서 정의한다.
var express = require("express");
var router = express.Router();

/*
- 신규 회원정보 등록처리 요청과 응답 라우팅메서드
- 호출주소: http://localhost:5000/api/member/entry
- 호출방식: POST 방식
** 중요: 클라이언트에서 호출하는 주소와 호출방식이 일치해야 해당 라우팅메서드가 실행됩니다. **
- 응답 결과: 신규 회원 정보 등록처리 후 DB에 저장된 회원정보 반환
*/
router.post("/entry", async (req, res) => {
  // 백엔드 API를 호출하면 무조건 아래 형식으로 데이터를 백엔드에서 반환한다.
  let apiResult = {
    code: 400, // 요청 상태 코드(200: 정상처리, 400: 요청 리소스가 없는 경우, 500: 서버개발자 코딩에러)
    data: null, // 백엔드에서 프론트엔드로 전달한 데이터
    msg: "", // 처리결과 코멘트(백엔드 개발자가 프론트엔드 개발자에게 알려주는 메시지)
  };

  try {
    // 로직 구현-로직에 에러가 나면 catch 블록으로 에러내용이 자동전달된다.
    // Step1: 프론트엔드에서 전송해주는 회원정보데이터(JSON)를 추출한다.
    // Step2: member 회원 테이블에 데이터를 등록한다.
    // Step3: 등록후 반환된 실제 DB에 저장된 회원 데이터를 프론트엔드에 반환한다.

    apiResult.code = 200;
    apiResult.data = {};
    apiResult.msg = "OK";
  } catch (err) {
    console.log("/api/member/entry 호출 에러 발생:", err.message);

    // ** 중요: 백엔드의 구체적인 에러 내용을 프론트엔드로 전송하는 것은 바로 사직서를 쓰는 것과 동일하다(보안적위험제공). **
    // 왜? DB 등록 처리 전 먼저 DB서버를 연결할 때 연결 실패 시 연결에러메시지를 제공하는데,
    // 이런 정보 내에 보안적으로 공유하면 안되는 정보들이 존재하기 때문
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.msg = "Failed";
  }

  // 프론트엔드에 최종 처리결과 데이터를 반환한다.
  res.json(apiResult);
});

module.exports = router;
