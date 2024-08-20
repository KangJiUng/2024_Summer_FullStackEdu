var express = require("express");
var router = express.Router();

// OpenAI API 호출을 위한 axios 패키지 참조하기
const axios = require("axios");

// 파일처리를 위한 filesystem 내장객체 참조하기
const fs = require("fs");

// OpenAI 객체 생성하기
const { OpenAI } = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/*
-OpenAI Dalle.3 API를 호출하여 프론트엔드에서 제공한 프롬프트 기반 이미지 생성 API
-호출주소: http://localhost:5000/api/openai/dalle
-호출방식: POST
-응답결과: 생성된 이미지 JSON 데이터 반환
*/
router.post("/dalle", async (req, res) => {
  let apiResult = {
    code: 400,
    data: null,
    msg: "",
  };

  try {
    // Step1: 프론트엔드에서 전달된 사용자 프롬프트 정보 추출하기
    const model = req.body.model;
    const prompt = req.body.prompt;

    // Step2: OpenAI Dalle API 호출하기
    const response = await openai.images.generate({
      model: model, // 이미지처리모델 선택: dall-e-2 or dall-e-3
      prompt: prompt, // 사용자 프롬프트
      n: 1, // 이미지 생성개수(dalle2는 최대 10개, dalle3는 1개)
      size: "1024*1024", // dalle2는 256*258, 512*512, 1024*1024 지원, dalle3는 1024*1024, 1792*1024, 1024*1792 지원)
      style: "vivid", // 기본값: vivid, natural: dalle3만 지원, 더 자연스럽고 초현실적인 이미지 생성
      response_format: "url", // url: openai 사이트에 생성된 이미지 풀주소경로반환, b64_json: 바이너리 데이터
    });

    // Step3: Dalle API 호출결과에서 물리적 이미지 생성 및 서버 공간에 저장하기
    // url 방식으로 이미지생성값을 반환받는 경우는 최대 1시간 이후에 openai 이미지 서버에서 해당 이미지가 삭제됨
    // 해당 이미지가 영구적으로 필요하면 반환된 url 주소를 이용해 이미지를 백엔드에 생성하면 됨
    const imageURL = response.data[0].url;
    console.log("dalle 이미지 생성 URL경로:", imageURL);

    // Step4: 최종 생성된 이미지 데이터 추출하기
    // Step5: DB 게시글 테이블에 사용자 이미지 생성요청 정보 등록 처리하기
    // Step6: 최종 생성된 이미지 정보를 프론트엔드로 반환하기
    apiResult.code = 200;
    apiResult.data = imageURL;
    apiResult.msg = "OK";
  } catch (err) {
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.msg = "Failed";
  }

  // 최종 처리결과값을 프론트엔드로 반환합니다.
  res.json(apiResult);
});

module.exports = router;
