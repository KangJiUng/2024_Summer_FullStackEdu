// admin.js 라우터의 기본주소는 http://localhost:5001/admin 주소로 app.js에 설정되어 있다.
var express = require("express");
var router = express.Router();

// moment 패키지
var moment = require("moment");

// ORM DB 객체 참조하기
var db = require("../models/index");

/*
- 관리자 계정 목록 조회 웹페이지 요청과 응답처리 라우팅 메서드
- 요청주소: http://localhost:5001/admin/list
- 요청방식: GET 방식
- 응답결과: 관리자 목록 조회 웹페이지(뷰파일+data) 반환
*/
router.get("/list", async (req, res, next) => {
  // 관리자 목록 조회옵션 데이터 정의(=viewModel)
  const searchOption = {
    company_code: "9",
    admin_id: "",
    used_yn_code: "9",
  };

  // Step1: 전체 관리자 계정목록 조회하기
  // findAll(): SELECT * FROM admin; 이라는 SQL 구문으로 ORM Framework가 내부적으로 자동 생성하여
  // DB 서버에 전달/실행되고 그 결과물이 백엔드로 반환
  const admins = await db.Admin.findAll();

  // Step2: 관리자 계정 목록 데이터 뷰파일 전달하기
  res.render("admin/list", { admins, moment, searchOption });
});

/*
- 관리자 계정 목록 조회 처리 웹페이지 요청과 응답처리 라우팅 메서드
- 요청주소: http://localhost:5001/admin/list
- 요청방식: POST 방식
- 응답결과: 관리자 조회옵션 결과 웹페이지(뷰파일+data) 반환
*/
router.post("/list", async (req, res, next) => {
  // Step1: 조회 옵션 정보 추출하기
  const company_code = req.body.company_code;
  const admin_id = req.body.admin_id;
  const use_yn_code = req.body.use_yn_code;

  // Step2: 조회옵션으로 관리자 정보 조회하기
  const admins = await db.Admin.findAll({
    where: { admin_id: admin_id },
  });

  // Step3: 조회옵션 기본값을 사용자가 입력/선택한 값으로 저장해서 뷰에 전달하기
  const searchOption = {
    company_code: company_code,
    admin_id: admin_id,
    used_yn_code: use_yn_code,
  };

  // Step4: 조회결과 데이터를 뷰에 전달하기
  res.render("admin/list", { admins, moment, searchOption });
});

/*
- 신규 관리자 계정 등록 웹페이지 요청과 응답처리 라우팅 메서드
- 요청주소: http://localhost:5001/admin/create
- 요청방식: GET 방식
- 응답결과: 신규 관리자 계정 등록 웹페이지(뷰파일) 반환
*/
router.get("/create", async (req, res, next) => {
  res.render("admin/create");
});

/*
- 신규 관리자 정보 등록 처리 요청과 응답처리 라우팅 메서드
- 요청주소: http://localhost:5001/admin/create
- 요청방식: POST 방식
- 응답결과: 신규 관리자 계정 등록 후 목록 페이지 이동
*/
router.post("/create", async (req, res, next) => {
  // Step1: 신규 관리자 정보 추출하기
  const admin_id = req.body.admin_id;
  const admin_password = req.body.admin_password;
  const company_code = req.body.company_code;
  const dept_name = req.body.dept_name;
  const admin_name = req.body.admin_name;
  const email = req.body.email;
  const telephone = req.body.telephone;
  const use_yn_code = req.body.use_yn_code;

  // Step2: 신규 관리자 정보 DB 저장 처리
  // 주의/중요: DB에 저장할 데이터 구조는 반드시 해당 모델의 속성명과 동일해야한다.
  // 신규 데이터 등록시 모델의 속성 중 NotNull(allowNull:false)인 속성값은 반드시 값을 등록해야합니다.
  const admin = {
    company_code: company_code,
    admin_id: admin_id,
    admin_password: admin_password,
    admin_name: admin_name,
    email: email,
    telephone: telephone,
    dept_name: dept_name,
    used_yn_code: use_yn_code,
    reg_date: Date.now(),
    reg_member_id: 1,
  };

  // DB admin 테이블에 상기 신규 데이터를 등록처리하고 실제 저장된 관리자 계정 정보를 DB 서버가 반환한다.
  // create(): INSERT INTO admin(...)values(...) 라는 SQL 구문을 ORM Framework이 만들어서 DB 서버에 전달하여 실행, 저장결과를 다시 반환한다.
  const registedAdmin = await db.Admin.create(admin);

  // Step3: 목록 페이지로 이동
  res.redirect("/admin/list");
});

/*
- 기존 관리자 정보 수정처리 요청과 응답처리 라우팅 메서드
- 요청주소: http://localhost:5001/admin/modify
- 요청방식: POST 방식
- 응답결과: 기존 관리자 계정 수정 처리 후 목록 페이지 이동
*/
router.post("/modify", async (req, res, next) => {
  // Step1: 사용자 수정 데이터 추출
  // const id = req.body.id;
  // const pw = req.body.pw;
  // const code = req.body.code;

  // Step2: DB에 해당 관리자 계정 수정처리

  // Step3: 수정 처리 후 목록 페이지로 이동

  res.redirect("/admin/list");
});

/*
- 기존 관리자 정보 삭제처리 요청과 응답처리 라우팅 메서드
- 요청주소: http://localhost:5001/admin/delete?id=1
- 요청방식: GET 방식
- 응답결과: 기존 관리자 계정 정보 삭제 처리 후 목록 페이지 이동
*/
router.get("/delete", async (req, res, next) => {
  res.redirect("/admin/list");
});

/*
- 기존 관리자 정보 확인 요청과 응답처리 라우팅 메서드
- 요청주소: http://localhost:5001/admin/modify/1
- 요청방식: GET 방식
- 응답결과: 기존 관리자 계정이 포함된 웹페이지(뷰파일) 제공
*/
router.get("/modify/:id", async (req, res, next) => {
  // Step1: URL에서 관리자 고유번호를 추출

  // Step2: 단일 관리자 정보를 DB에서 조회

  // Step3: 단일 관리자 정보를 뷰에 전달
  res.render("admin/modify");
});

module.exports = router;
