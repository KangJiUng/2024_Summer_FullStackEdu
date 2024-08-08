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

// 배열 내에 여러 데이터 유형을 할당하고 해당 배열의 타입을 Union타입으로 정의할 수 있습니다.
const userData: (string | number | boolean)[] = ["홍길동2", 40, false];

// type 선언자를 이용해 개발자가 원하는 타입을 정의하고 사용할 수 있습니다.
// 특정값으로 데이터값을 제한할 수 있습니다.
type ProcessStates = "open" | "closed";

let state: ProcessStates = "open";

// 특정값만 설정할 수 있는 type 변수에 할당할 수 없는 값을 지정하면 에러가 발생합니다.
// let state1: ProcessStates = "open1";

type OddNumbersUnderTen = 1 | 3 | 5 | 7 | 9;
let oddNumber: OddNumbersUnderTen = 3;

// 할당할 수 없는 값을 지정하면 에러가 발생합니다.
// let oddNumber1: OddNumbersUnderTen = 2;
