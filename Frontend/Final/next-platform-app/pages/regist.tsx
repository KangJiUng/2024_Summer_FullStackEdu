// 신규회원가입 페이지 컴포넌트
// http://localhost:3003/regist

// 화면상의 데이터 관리를 위한 useState 훅 참조
import { useState } from "react";

// 프론트엔드 라우팅 주소 이동처리를 위한 useRouter 훅 참조
import { useRouter } from "next/router";

import { IEntryMember } from "@/interfaces/member";

const Regist = () => {
  // useRouter 훅 객체 생성하기
  const router = useRouter();

  // 신규 회원가입 정보 상태 데이터 정의 및 값 초기화처리
  // useState(초기값설정) 함수는 [변수, 변수값변경 setter함수] 배열을 반환한다.
  const [member, setMember] = useState<IEntryMember>({
    email: "",
    password: "",
    name: "",
  });

  // 사용자 입력요소의 값이 변경될 때마다 데이터소스와 동기화를 처리해주는 이벤트 처리 함수
  const memberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // ...member란 현재 member상수의 복사본 객체를 생성한다는 의미
    // e.target은 Change 이벤트가 발생한 UI 요소를 의미
    // e.target.name는 이벤트가 발생한 요소의 name 속성값(지금 상황에선 "email" or "password" or "name")
    // e.target.value는 이벤트가 발생한 요소의 현재 value 값
    setMember({ ...member, [e.target.name]: e.target.value });
  };

  // 회원가입 버튼 클릭시 신규 회원정보 처리 백엔드 함수
  const registSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // 화면 리프레시 방지
    e.preventDefault();

    // 백엔드 RESTful API 중 신규회원가입 API를 fetch() AJAX 호출기능을 통해 가입정보를 백엔드로 전달한다.
    // 예시1) ES2015 자바스크립트 기본 AJAX 통신 내장 라이브러리인 fetch를 이용해 백엔드와 통신하기
    // await fetch("백엔드 API 호출주소", 호출옵션);
    // fetch() 함수를 통해 데이터를 백엔드로 전달할 때는 반드시 json문자열 형태로 전달한다.
    // JSON.stringify(json데이터): json 데이터를 json 문자열로 변경해주는 내장함수
    try {
      // Step1) fetch()함수 호출하기
      const response = await fetch("http://localhost:5000/api/member/entry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(member),
      });

      // Step2) fetch() 함수 호출 결과 백엔드 반환 실제 데이터 추출하기
      const result = await response.json();

      if (result.code == 200) {
        console.log("백엔드에서 제공한 JSON 데이터 확인:", result);

        // 정상적으로 회원가입된 경우 로그인 페이지 컴포넌트로 이동처리
        // router.push("이동시키고자하는 프론트엔드 url 주소 정보(도메인주소제외)");
        router.push("/login");
      } else {
        console.log("백엔드 서버 에러 발생:", result.msg);

        if (result.msg == "Exist Member" && result.code == 400) {
          alert("동일한 메일주소가 존재합니다.");
          return false;
        }
      }
    } catch (err) {
      console.error("백엔드 REST API 호출 중에 에러가 발생했습니다.");
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Regist your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {/* 신규 회원가입 폼 영역 */}
          <form className="space-y-6" onSubmit={registSubmit}>
            {/* 메일주소 입력 영역 */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={member.email}
                  onChange={memberChange}
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* 사용자 암호 입력 영역 */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={member.password}
                  onChange={memberChange}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* 사용자 이름 입력 영역 */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={member.name}
                  onChange={memberChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* 회원가입 버튼 표시 영역 */}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Regist
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{" "}
            <a
              href="#"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Regist;
