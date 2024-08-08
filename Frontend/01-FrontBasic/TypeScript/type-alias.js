var sample;
sample = "안녕하세요";
sample = 11111;
// 회원 데이터 객체의 구조를 정의하고 값을 할당해서 person 객체변수를 할당
var personData = {
    name: "jiung",
    age: 22,
    address: { city: "청주시", country: "대한민국" },
};
function printPersonInfo(person) {
    console.log("name: ".concat(person.name, ", age: ").concat(person.age, ", address: ").concat(person.address.country, " ").concat(person.address.city));
}
printPersonInfo(personData);
