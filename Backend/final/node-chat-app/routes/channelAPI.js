var express = require("express");
var router = express.Router();

// jsonwebtoken 참조하기
var jwt = require("jsonwebtoken");

//ORM db객체 참조하기
var db = require("../models/index");

/*
-전체 채널 목록 조회 요청 및 응답처리 API 라우팅 메소드
-호출주소: http://localhost:5000/api/channel/list
-요청방식: GET
-응답결과: 전체 채널 목록 데이터
*/
router.get("/list", async (req, res) => {
  let apiResult = {
    code: 400,
    data: null,
    msg: "",
  };

  try {
    const channels = await db.Channel.findAll();

    apiResult.code = 200;
    apiResult.data = channels;
    apiResult.msg = "Ok";
  } catch (err) {
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.msg = "Server Error";
  }

  res.json(apiResult);
});

/*
-신규 채널 등록 요청 및 응답처리 API 라우팅 메소드
-호출주소: http://localhost:5000/api/channel/create
-요청방식: POST
-응답결과: 등록된 단일 채널 데이터
*/
router.post("/create", async (req, res) => {
  let apiResult = {
    code: 400,
    data: null,
    msg: "",
  };

  try {
    // Step0: 프론트엔드에서 전달된 JWT 토큰값에서 로그인 사용자 정보 추출하기
    var token = req.headers.authorization.split("Bearer ")[1];
    console.log("게시글 등록 api token:", token);

    // 사용자 토큰정보 유효성 검사 후 정상적이면 토큰 내에 사용자인증 json데이터 반환
    var loginMember = await jwt.verify(token, process.env.JWT_AUTH_KEY);

    // Step1: 프론트엔드에서 전달한 데이터 추출하기
    const channel_name = req.body.channel_name;
    const user_limit = req.body.user_limit;
    const channel_state_code = req.body.channel_state_code;

    // Step2: DB channel 테이블에 저장할 JSON 데이터 생성하기
    // Channel 모델의 속성명과 데이터 속성명을 동일하게 작성해야한다.
    const channel = {
      community_id: 1,
      category_code: 2,
      channel_name,
      user_limit,
      channel_state_code,
      reg_date: Date.now(),
      reg_member_id: loginMember.member_id,
    };

    // Step3: db channel 테이블에 신규 채널 정보 등록처리
    const registedChannel = await db.Channel.create(channel);

    // Step4: 처리결과값 프론트엔드 반환
    apiResult.code = 200;
    apiResult.data = registedChannel;
    apiResult.msg = "OK";
  } catch (err) {
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.msg = "Failed";
  }

  res.json(apiResult);
});

module.exports = router;
