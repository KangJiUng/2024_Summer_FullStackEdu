// index.js 라우터의 용도는 전체 웹사이트의 공통기능에 대한 라우팅 기능을 제공합니다.
// 기본 접속 주소는  http://localhost:5001로 접근하도록 app.js에서 설정되어있습니다.
var express = require("express");
var router = express.Router();

// 관리자 암호를 단방향암호화(해시알고리즘)하기 위해 bcryptjs 패키지 참조하기
var bcrypt = require("bcryptjs");

// ORM DB 객체 참조
var db = require("../models/index");

// 관리자 암호를 단방향암호화(해시알고리즘)하기 위해 bcryptjs 패키지 참조하기
var bcrypt = require("bcryptjs");

/*
- 관리자 웹사이트 로그인 화면 요청/응답 라우팅 메서드
- 호출 주소: http://localhost:5001/login
- 호출 방식: GET 방식
- 응답 결과: login.ejs 뷰파일 (로그인 화면 웹페이지 /views/login.ejs)
*/
router.get("/login", async (req, res) => {
  let resultMsg = {
    code: 400,
    msg: "",
  };

  res.render("login.ejs", { layout: false, resultMsg });
});

// 관리자 로그인 정보 처리 라우팅 메서드
// 호출 주소: http://localhost:5001/login
// 호출 방식: POST 방식
// 응답 결과: 메인 페이지 이동(http://localhost:5001/main)
router.post("/login", async (req, res) => {
  let resultMsg = {
    code: 400,
    msg: "",
  };

  // Step1: 관리자 아이디/암호를 추출한다.
  const admin_id = req.body.admin_id;
  const admin_password = req.body.admin_password;

  // Step2: 동일한 관리자 아이디 정보를 조회한다.
  const admin = await db.Admin.findOne({ where: { admin_id, admin_password } });

  // Step3: DB 저장 암호와 관리자 입력 암호를 체크한다.
  // 동일한 아이디가 존재하는 경우
  if (admin) {
    // DB에 저장된 암호와 관리자가 로그인 화면에서 입력한 암호가 일치하는지 체크
    // bcrypt.compart("로그인화면에서 전달된 암호", DB에 저장된 암호화된 문자열) 메서드는 암호가 같으면 true 반환, 다르면 false 반환
    if (bcrypt.compare(admin_password, admin.admin_password)) {
      // Step4: 아이디/암호가 일치하면 메인페이지로 이동시키고 그렇지 않으면 처리결과 DATA를 login.ejs에 전달한다.
      res.redirect("/main");
    } else {
      // 암호가 일치하지 않는 경우
      resultMsg.code = 402;
      resultMsg.msg = "암호가 일치하지 않습니다.";
      res.render("login.ejs", { layout: false, resultMsg });
    }
  } else {
    // 아이디가 일치하지 않는 경우
    resultMsg.code = 401;
    resultMsg.msg = "아이디가 존재하지 않습니다.";
    res.render("login.ejs", { layout: false, resultMsg });
  }
});

// 메인페이지 요청/응답 라우팅 메서드
// 호출 주소: http://localhost:5001/main
// 호출 방식: GET 방식
// 응답 결과: main.ejs 뷰파일(메인 웹페이지 /views/main.ejs)
router.get("/main", async (req, res) => {
  res.render("main.ejs");
});

module.exports = router;
