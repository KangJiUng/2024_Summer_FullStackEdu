const user: { id: number; name: string; email: string; telephone?: string } = {
  id: 2,
  name: "지웅",
  email: "test@test.co.kr",
  telephone: "010-1234-1234",
};

// 객체 타입을 정의하는 방법1: 인터페이스 이용
// 일반적인 현업 코딩 컨벤션에서 json data와 같은 data 객체들은 주로 인터페이스로 타입을 정의하는 편
interface User {
  id: number;
  name: string;
  email: string;
  telephone?: string; // optional 속성 타입
}

// 객체 타입을 정의하는 방법2: type alias 이용
type UserType = {
  id: number;
  name: string;
  email: string;
  telephone?: string;
};

let user3: User = {
  id: 3,
  name: "지웅3",
  email: "test3@test.co.kr",
};

let user4: UserType = {
  id: 4,
  name: "지웅4",
  email: "test4@test.co.kr",
};
