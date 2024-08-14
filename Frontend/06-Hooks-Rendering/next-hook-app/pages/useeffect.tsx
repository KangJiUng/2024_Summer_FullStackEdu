// 컴포넌트 내에서의 데이터 상태관리를 위한 useState 훅 참조하기
// 현재 컴포넌트의 생애주기(LifeCycle) 관리를 위한 useEffect 훅 참조하기
import { useState, useEffect } from "react";
import Link from "next/link";

// ** 중요: useEffect 훅을 이용할 때는 반드시 프로젝트의 next.config.mjs 파일내 reactStrictMode를 false로 설정해야합니다. **
// reactStrictMode 설정은 개발시에만 사용되고 서비스/배포와는 무관한 설정입니다.

// 단일 블로그 데이터 타입 정의
interface BlogItem {
  id: number;
  title: string;
  view_cnt: number;
  create_date: string;
}

// 게시글 원본 데이터 목록(Database)
const originalData: BlogItem[] = [
  {
    id: 1,
    title: "제목1입니데이",
    view_cnt: 10,
    create_date: "2024-08-14",
  },
  {
    id: 2,
    title: "제목2입니데이바이데이",
    view_cnt: 20,
    create_date: "2024-08-14",
  },
  {
    id: 3,
    title: "제목3입니데이식스",
    view_cnt: 30,
    create_date: "2024-08-14",
  },
  {
    id: 4,
    title: "제목4입니데이터",
    view_cnt: 40,
    create_date: "2024-08-14",
  },
  {
    id: 5,
    title: "제목5입니데이데이",
    view_cnt: 50,
    create_date: "2024-08-14",
  },
];

const BlogList = () => {
  // 검색어 키워드 상태 데이터값 정의 및 초기화
  const [searchWord, setSearchWord] = useState<string>("");

  // 검색 결과 블로그 목록 상태 데이터 값 정의 초기화
  const [blogs, setBlogs] = useState<BlogItem[]>([]);

  // 현재 컴포넌트가 최초로 화면에 렌더링되는 시점(mount)에 실행되는 useEffect 훅 정의
  // useEffect(최초 마운팅될 때 실행할 콜백함수, 생애주기 시점 정의-빈 배열 []의 경우 최초 마운팅되는 시점을 말합니다.)
  // useEffect(실행할 콜백 함수, []); : 해당 컴포넌트의 최초 마운팅 시점과 언마운팅 시점에 대해 프로그래밍 가능합니다.
  useEffect(() => {
    console.log(
      "최초 블로그 조회 화면이 나타나는 시점(마운팅시점)에 호출됩니다."
    );

    // 해당 컴포넌트가 최초(1회) 마운팅될 때 백엔드 REST API를 호출해서 블로그 목록을 조회해옵니다.
    // 조회해온 블로그 목록데이터를 setBlogs() setter함수를 통해 상태데이터로 저장합니다.
    setBlogs(originalData);

    // 해당 컴포넌트가 사라지는 시점(unmount)에 실행되는 콜백함수(클린업 함수) 정의
    return () => {
      console.log("블로그 목록 페이지가 사라지기 전에 호출됩니다.");
    };
  }, []);

  // 화면내 변화가 발생할 때마다 실행되는 useEffect 훅 정의하기
  useEffect(() => {
    console.log(
      "화면내에서 상태 데이터가 변경되어 렌더링이 일어날 때마다 실행됩니다."
    );
  });

  // 특정 데이터 상태 데이터의 변경을 감지하여 프로그래밍을 구현하고 싶은 경우도 useEffect훅을 사용합니다.
  // useEffect(실행할 콜백 함수, [감지할 상태 데이터]);
  // 감지할 상태데이터값이 변경될 때마다 콜백함수가 실행됩니다.
  useEffect(() => {
    console.log("검색어가 변경되어 블로그목록을 갱신합니다.");
    blogSearch();
  }, [searchWord]);

  // 검색어 기반 블로그 검색 처리함수 정의
  // 검색 버튼 클릭시 호출되는 함수
  const blogSearch = () => {
    let searchResult: BlogItem[] = [];

    if (searchWord.length > 0) {
      searchResult = originalData.filter((item) =>
        item.title.includes(searchWord)
      );
      setBlogs(searchResult);
    } else {
      setBlogs(originalData);
    }
  };

  return (
    <div>
      <div className="m-4 flex">
        <select
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
          className="block rounded-md border-0 w-3/12 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          <option>전체보기</option>
          <option>선택</option>
          <option>선택</option>
        </select>
      </div>

      <h1 className="m-4 text-2xl">
        <b>Product List</b>
      </h1>

      <div className="m-4">
        <table className="w-full text-center">
          <thead>
            <tr>
              <th>제품번호</th>
              <th>제품명</th>
              <th>제조사</th>
              <th>가격</th>
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
