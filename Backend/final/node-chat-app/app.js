var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// 환경설정정보 구성
require("dotenv").config();

// 시퀄라이즈 ORM을 이용해 DB서버와 연결작업 진행
var sequelize = require("./models/index.js").sequelize;

// RESTful API 서비스 CORS 이슈해결을 위한 CORS 패키지 참조
const cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

// 회원정보 관리 RESTful API 라우터파일 참조하기
var memberAPIRouter = require("./routes/memberAPI");

var app = express();

//mysql과 자동연결처리 및 모델기반 물리 테이블 생성처리제공
sequelize.sync();

// 모든 웹사이트/모바일 프론트에서 REST API에 접근할 수 있게 허락
app.use(cors());

//특정 도메인주소만 허가
// app.use(
//   cors({
//     methods: ["GET", "POST", "DELETE", "OPTIONS"],
//     origin: ["http://localhost:3000", "https://beginmate.com"],
//   })
// );

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// memberAPIRouter의 기본 호출주소 체계 정의하기
app.use("/api/member", memberAPIRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// 노드 앱의 기본 WAS 서비스 포트
app.set("port", process.env.PORT || 5001);

// 노드앱이 작동되는 서버 객체 생성
var server = app.listen(app.get("port"), function () {});
