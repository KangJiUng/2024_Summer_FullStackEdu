const books: string[] = [];
books.push("헨리6세");
books.push("세종대왕");
books.push("선조");

console.log("책목록:", books);

const userData1 = ["홍길동", 20, true]; // 자바스크립트

// 배열내 다양한 데이터 타입을 정의해서 사용한다.
const userData2: (string | number | boolean)[] = ["홍길동", 20, true]; // 타입스크립트

// 무조건 배열내 첫 번째, 두 번째, 세 번째 데이터는 문자열, 숫자형, 불린형 타입이 와야한다고 제한
const userData3: [string, number, boolean] = ["홍길동", 20, true];
