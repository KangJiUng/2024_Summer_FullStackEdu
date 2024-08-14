// 컴포넌트 내에서의 데이터 상태관리를 위한 useState 훅 참조하기
// 현재 컴포넌트의 생애주기(LifeCycle) 관리를 위한 useEffect 훅 참조하기
import { useState, useEffect } from "react";

// **중요: useEffect 훅을 이용할 때는 반드시 프로젝트의 next.config.mjs 파일내 reactStrictMode를 false로 설정해야합니다.**
// reactStrictMode 설정은 개발시에만 사용되고 서비스/배포와는 무관한 설정입니다.

const BlogList = () => {
  // 검색어 키워드 상태 데이터값 정의 및 초기화
  const [searchWord, setSearchWord] = useState("");

  // 검색 결과 블로그 목록 상태 데이터 값 정의 초기화
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "블로그 제목1",
      view_cnt: 10,
      create_date: "2024-08-14",
    },
  ]);

  // 현재 컴포넌트가 최초로 화면에 렌더링되는 시점(mount)에 실행되는 useEffect 훅 정의
  // useEffect(최초 마운팅될 때 실행할 콜백함수, 생애주기 시점 정의-빈 배열 []의 경우 최초 마운팅되는 시점을 말합니다.)
  useEffect(() => {
    console.log(
      "최초 블로그 조회 화면이 나타나는 시점(마운팅시점)에 호출됩니다."
    );

    // 해당 컴포넌트가 사라지는 시점(unmount)에 실행되는 콜백함수(클린업 함수) 정의
    return () => {
      console.log("블로그 목록 페이지가 사라지기 전에 호출됩니다.");
    };
  }, []);

  return (
    <div>
      <h1 className="m-4">
        <b>블로그 조회하기</b>
      </h1>

      {/* 상단 검색어 입력 영역 */}
      <div className="m-4 flex">
        <input
          type="text"
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
          className="block rounded-md border-0 w-3/12 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="  검색어를 입력해주세요."
        />
        <button
          type="button"
          className="ml-2 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          검색
        </button>
      </div>

      {/* 블로그 검색 결과목록 표시 영역 */}
      <div className="m-4">
        <table className="w-full text-center">
          <thead>
            <tr>
              <th>글번호</th>
              <th>글제목</th>
              <th>조회수</th>
              <th>등록일자</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.view_cnt}</td>
                <td>{item.create_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogList;
