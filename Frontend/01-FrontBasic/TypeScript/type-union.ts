let productCode: string | number = "10000";
productCode = 20000;

// 파라미터로 숫자/문자 둘 다 지원하는 함수
function getCode(code: number | string): string {
  // 파라미터로 전달된 코드의 데이터 타입이 숫자형이면 문자로 변환하고 문자열을 반환합니다.
  if (typeof code === "number") {
    code = "P-" + code.toString();
  }
  return code;
}

// 동일한 함수인데 숫자를 전달하는 경우
console.log("getcode:", getCode(1000));

// 동일한 함수인데 문자를 전달하는 경우
console.log("getcode:", getCode("P-1000"));
