function greeting(user) {
    return "Hello~ ".concat(user.name, "!");
}
var user = {
    name: "지웅",
    age: 20,
};
console.log(greeting(user));
var employee = {
    name: "Alice",
    department: "Development",
    address: "NewYork",
    group: "IT",
    // test: "aaa",
};
// Car 클래스는 Movable 인터페이스를 상속받아 해당 인터페이스의 속성과 기능을 클래스 내에서 반드시 구현(implements)해야한다.
var Car = /** @class */ (function () {
    // 생성자 함수: 클래스를 통해 객체가 생성되는 시점에 자동으로 호출되는 함수
    // 클래스를 이용해 객체를 만들어 내는 과정, 즉 new Car()을 인스턴스화한다.
    function Car(speed) {
        // this: 현재 클래스 내부에 접근하기 위한 예약어
        // this.speed: 클래스내 내부 속성인 상단 클래스 내에 정의된 speed 속성
        // speed: 객체를 생성하는 시점에 생성자함수로 전달되는 속도값 파라미터
        this.speed = speed;
    }
    Car.prototype.move = function () {
        console.log("\uD604\uC7AC \uC790\uB3D9\uCC28\uB294 ".concat(this.speed.toString(), "km \uC18D\uB3C4\uB85C \uC774\uB3D9\uC911\uC785\uB2C8\uB2E4."));
    };
    return Car;
}());
// 클래스를 이용해 myCar라는 객체(object)를 생성
// new 연산자를 이용해 클래스의 객체를 만들고, 만들어진 객체는 프로그램이 실행되는 컴퓨터의 메모리에 저장되며 이러한 과정을 인스턴스화 라고 표현한다.
// 클래스는 인스턴스화될 때 클래스 내 정의된 생성자함수가 자동으로 실행되고 해당 함수에 파라미터를 전달할 수 있따.
var myCar = new Car(100);
console.log("내 차의 현재 속도:", myCar.speed);
myCar.move();
