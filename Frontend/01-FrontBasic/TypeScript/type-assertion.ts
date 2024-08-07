// Case2) 타입 어서션 개념 이해하기
// any타입은 타입이 어떤 타입인지 정확히 모를 때 저정할 수 있는 타입을 말합니다.
// 프론트/백엔드, 외부시스템, 타팀이 만든 결과 데이터를 받을 때 정확한 타입을 모를 때 사용합니다.
// 타입스크립트 기반 애플리케이션을 개발하면서 any타입을 남발하는 것은 좋지 않습니다.

let notSure: any = 4;
notSure = "maybe a string instead";
notSure = true;

console.log("notSure:", notSure);

let fullName: any = "강지웅";

// 변수의 형변환하기1: <string>fullName은 fullName을 string 타입으로 형변환
let fullNameLength: number = (<string>fullName).length;

// 변수의 형변환하기2: fullName as string은 fullName을 string 타입으로 형변환
let fullNameLength2: number = (fullName as string).length;

const companyName = "MSoftware" as string;

// 인터페이스는 객체의 구조와 속성의 타입을 지정하는 방법을 제공합니다.
interface User {
  id: number;
  name: string;
  email: string;
  telephone?: string; // 반드시 입력하지 않아도 된다는 선택적 속성을 지정할 때 ? 를 사용합니다.
}

let user = {} as User;
user.id = 1;
user.name = "강지웅";
user.email = "test@test.co.kr";

console.log("user===>", user);
