// 변수별 타입을 지정하고 값을 할당합니다.
var memberName: string = "강지웅";
let age: number = 22;
let price: number = 5000;
const isMale: boolean = false;

let totalPayPrice: number = 0;

function showTotalPrice(price: number, count: number): void {
  totalPayPrice = price * count;
  console.log(`totalPayPrice: ${totalPayPrice}`);
}

console.log("사용자명:", memberName);
console.log("나이:", age);
console.log("가격:", price);
console.log("성별:", isMale);

showTotalPrice(price, 5);

// 컴파일 및 실행 명령어
// tsc --strictNullChecks variable.ts 또는 tsc variable.ts
// node type-variable.js
