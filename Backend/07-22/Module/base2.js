//base1 모듈을 참조해서 odd, even, test 함수를 참조합니다.

// base1.js export module의 노출객체를 객체 비구조화할당방식으로 변수 odd, even, test 함수를 참조합니다.
const { odd, even, test } = require("./base1.js");
// 위와 동일 -> const { odd, even, test } = { odd, even: even, test: function() };

// 전달되는 숫자가 홀수인지 짝수인지 체크해서 홀짝 문자열 상수를 반환합니다.
// 숫자를 던져주면 문자열로 홀수이면 "홀수입니다."를, 짝수이면 "짝수입니다."를 반환한다.
function checkOddOrEven(num) {
  // 나누기 연산자 / %는 ~값으로 나눈 나머지값을 산출한다.
  if (num % 2) {
    // 나머지값이 홀수
    return odd;
  }
  return even; // 나머지값이 짝수
}

console.log("base2.js에서 사용하는 base1.js의 test 함수 호출하기", test());

module.exports = checkOddOrEven;
