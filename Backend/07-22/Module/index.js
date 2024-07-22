// base1.js 모듈 내 odd, even 상수 참조하기
const { odd, even } = require("./base1.js");

// base2.js 모듈 내 checkOddOrEven 함수 참조하기
const checkOddOrEven = require("./base2.js");

// 문자열을 던지면 문자열이 길이가 짝수이면 "짝수입니다."를, 홀수이면 "홀수입니다."를 반환한다.
function checkStringOddOrEven(str) {
  if (str.length % 2) {
    return odd; // 문자열의 길이가 홀수
  }
  return even; // 문자열의 길이가 짝수
}

// base2.js 모듈 내 노출함수를 재사용한다.
console.log("숫자에 대한 홀짝수 체크하기1:", checkOddOrEven(10));
console.log("숫자에 대한 홀짝수 체크하기2:", checkOddOrEven(5));

// 홀짝 문자열 상수를 출력할 때 base1.js 모듈 내 상수를 참조해 재사용한다.
console.log(
  "문자열 길이에 대한 홀짝수 체크하기1:",
  checkStringOddOrEven("안녕")
);
console.log(
  "문자열 길이에 대한 홀짝수 체크하기2:",
  checkStringOddOrEven("안녕하세요")
);
