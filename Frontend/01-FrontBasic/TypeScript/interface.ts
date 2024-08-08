// 인터페이스의 목적: 데이터 타입을 정의하거나 특정 인터페이스를 상속받아 기능을 확장(extends 이용) 시킨다.
// 인터페이스 사용시 주의할 점: 특정 클래스에서 해당 인터페이스를 상속 받으면 반드시 인터페이스의 기능과 속성을 구현해주어야한다.
interface User {
  name: string;
  age: number;
}

type MemberType = {
  name: string;
  age: number;
};

function greeting(user: User): string {
  return `Hello~ ${user.name}!`;
}

let user: User = {
  name: "지웅",
  age: 20,
};

console.log(greeting(user));

// 인터페이스는 인터페이스를 상속받아 기능을 확장할 수 있다.
interface Person {
  name: string;
}

interface Person {
  address: string;
}

interface Group {
  group: string;
}

// Employee 인터페이스는 extends 키워드를 이용하여 특정 인터페이스를 상속받아 기능을 확장할 수 있다.
// 여러 개의 인터페이스를 상속 받을 수 있다.
interface Employee extends Person, Group {
  department: string;
}

let employee: Employee = {
  name: "Alice",
  department: "Development",
  address: "NewYork",
  group: "IT",
  // test: "aaa",
};

// 객체지향적으로 인터페이스를 사용해보자.
// OOP(Object Oriented Programming)에서의 인터페이스는 인터페이스에서 정의한 속성과 기능을 정의하고
// 해당 인터페이스를 상속받은 클래스는 반드시 해당 인터페이스에서 정의한 속성/기능을 구현해야하는 제약이 있다.
// 인터페이스는 직접적인 기능 구현을 하지 않고 형식만 정의해서 해당 형식을 구현하거나 확장할 수 있는 방법만을 제공한다.
interface Moveable {
  speed: number;
  move(): void;
}

// Car 클래스는 Movable 인터페이스를 상속받아 해당 인터페이스의 속성과 기능을 클래스 내에서 반드시 구현(implements)해야한다.
class Car implements Moveable {
  speed: number;

  // 생성자 함수: 클래스를 통해 객체가 생성되는 시점에 자동으로 호출되는 함수
  // 클래스를 이용해 객체를 만들어 내는 과정, 즉 new Car()을 인스턴스화한다.
  constructor(speed: number) {
    // this: 현재 클래스 내부에 접근하기 위한 예약어
    // this.speed: 클래스내 내부 속성인 상단 클래스 내에 정의된 speed 속성
    // speed: 객체를 생성하는 시점에 생성자함수로 전달되는 속도값 파라미터
    this.speed = speed;
  }

  move() {
    console.log(
      `현재 자동차는 ${this.speed.toString()}km 속도로 이동중입니다.`
    );
  }
}

// 클래스를 이용해 myCar라는 객체(object)를 생성
// new 연산자를 이용해 클래스의 객체를 만들고, 만들어진 객체는 프로그램이 실행되는 컴퓨터의 메모리에 저장되며 이러한 과정을 인스턴스화 라고 표현한다.
// 클래스는 인스턴스화될 때 클래스 내 정의된 생성자함수가 자동으로 실행되고 해당 함수에 파라미터를 전달할 수 있따.
let myCar = new Car(100);
console.log("내 차의 현재 속도:", myCar.speed);
myCar.move();
