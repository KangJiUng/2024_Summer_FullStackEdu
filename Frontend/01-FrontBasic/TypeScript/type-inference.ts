// Case1) 변수 타입추론 개념 이해하기
// 변수의 타입을 지정하지 않아도 값을 명시적으로 할당하면 타입 추론에 의해 타입이 결정됩니다.

var memberName = "강지웅";
var price = 5000;
var isMale = false;

console.log(
  "회원명은 타입추론에 의해 컴파일시 문자로 자동인식됨:",
  memberName.length
);
// console.log("가격은 타입추론에 의해 컴파일시 숫자로 자동인식됨:", price.length); -> price(숫자)는 length 사용 불가

var user = {
  id: 1,
  name: "강지웅",
  email: "test@test.co.kr",
};

console.log("user의 타입추론:", user.name.length);
// console.log("user의 타입추론:", user.id.length);

function plus(a: number, b: number) {
  return a + b;
}

console.log(plus(1, 2));
// console.log(plus(1, 2).length);
