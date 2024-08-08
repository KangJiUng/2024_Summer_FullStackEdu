function getRandomElement<T>(list: T[]): T {
  // 전달된 배열목록에서 랜덤하게 배열의 단일 아이템을 반환한다.
  const randIdx = Math.floor(Math.random() * list.length);
  return list[randIdx];
}

// 문자열 배열 전용 랜덤 문자 추출기 함수
function getRandomString(list: string[]): string {
  // 전달된 배열목록에서 랜덤하게 배열의 단일 아이템을 반환한다.
  const randIdx = Math.floor(Math.random() * list.length);
  return list[randIdx];
}

function getrandomNumber(list: number[]): number {
  // 전달된 배열목록에서 랜덤하게 배열의 단일 아이템을 반환한다.
  const randIdx = Math.floor(Math.random() * list.length);
  return list[randIdx];
}

// 특정 타입에 최적화된 함수를 별도로 만들고 사용하기1
const randomString = getRandomString(["A", "B", "C"]);
console.log("문자열 배열에서 랜덤한 문자 추출하기:", randomString);

// 특정 타입에 최적화된 함수를 별도로 만들고 사용하기2
const randomNumber = getrandomNumber([1, 2, 3]);
console.log("숫자 배열에서 랜덤한 숫자 추출하기:", randomNumber);

// 제너릭 타입을 이용하여 타입에 제한없이 사용가능한 함수 사용하기
const randomString1 = getRandomElement(["A", "B", "C"]);
const randomNumber1 = getRandomElement([1, 2, 3]);
const randomUser = getRandomElement([
  { id: 1, name: "사용자1", email: "test@test.co.kr" },
  { id: 2, name: "사용자2", email: "test2@test.co.kr" },
  { id: 3, name: "사용자3", email: "test3@test.co.kr" },
]);

// 제너릭 기반으로 타입에 의존적이지 않은 함수 하나를 만들어 획기적으로 코딩량을 줄이고
// 재사용가능한 코드를 만들어 유지보수 효과를 극대화할 수 있다.
console.log("getRandomElemetn-string:", randomString1);
console.log("getRandomElemetn-number:", randomNumber1);
console.log("getRandomElemetn-UserType:", randomUser);
