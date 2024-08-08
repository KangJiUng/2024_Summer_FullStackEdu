function add1(a, b) {
    return a + b;
}
function add2(a, b) {
    console.log("결과값:", a + b);
}
var result1 = add1(10, 10);
var data1 = 20;
var data2 = 30;
add2(data1, data2);
// 일반함수: function 함수명() {}
function greeting1(name) {
    return "Hello~ ".concat(name, "!");
}
// 익명함수
var greeting2 = function (name) {
    return "Hello~ ".concat(name, "!");
};
// 화살표 함수
var greeting3 = function (name) {
    return "Hello~ ".concat(name, "!");
};
console.log(greeting1("지웅1"));
console.log(greeting2("지웅2"));
console.log(greeting3("지웅3"));
// 선택적(optional) 속성/변수 선언하기(? 사용): 해당값을 반드시 전달할 필요 없음
function greet(name, msg) {
    if (name === void 0) { name = "Guest"; }
    if (msg) {
        return "".concat(name, "\uB2D8 ").concat(msg);
    }
    else {
        return "Hello~ ".concat(name, "!");
    }
}
console.log(greet());
console.log(greet("강지웅"));
console.log(greet("강지웅", "반갑습니다."));
