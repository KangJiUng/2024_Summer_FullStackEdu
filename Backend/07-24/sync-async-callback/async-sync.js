// 자바스크립트, 노드 언어의 기본 특성을 알아봅시다.
// 1. 자바스크립트, 노드는 기본적으로 비동기 프로그래밍 방식으로 작동됩니다.

// task1
function fn1() {
  console.log("========>fn1 실행됨");
}

// task2
function fn2(cbFunction) {
  // 3초 후에 실행되는 fn2() 로직
  setTimeout(function () {
    console.log("========>fn2 실행됨");
    // fn3();
    cbFunction();
  }, 3000);
}

// task3
function fn3() {
  console.log("========>fn3 실행됨");
}

// 비동기 방식 예시
// 전체 처리로직: fn1(), fn2(), fn3()
// 처리 순서와 상관없이 먼저 실행되는 놈부터 실행된다.
// fn1();
// fn2();
// fn3();

// 콜백함수를 이용한 동기방식 프로그래밍 적용하기
// 동기방식: fn1() -> fn2() -> fn3()
// 콜백함수(함수 내에서 함수를 호출하는 방식)을 이용하여 반드시 fn1 로직이 실행된 후 fn2가 실행되고 fn3가 실행되게 해보자.
fn1();
// fn2(fn3);
fn2(function () {
  console.log("========>fn3 실행됨");
});