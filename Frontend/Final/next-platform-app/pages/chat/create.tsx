// 백엔드 RESTful API 통신을 위한 axios 패키지 참조하기
import axios from "axios";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { IChannelCreate, ChannelState } from "@/interfaces/message";

const ChannelCreate = () => {
  const router = useRouter();

  // 최초 화면 컴포넌트 렌더링(마운팅) 시점에 로컬스토리지내 토큰값 존재여부 체크
  // 토큰이 없으면 로그인하라고 페이지 리디렉션 처리하기
  useEffect(() => {
    // 서버 인증 JWT 사용자 인증 토큰이 스토리지에 없으면 로그인 페이지로 이동처리
    if (localStorage.getItem("token") == undefined) {
      router.push("/login");
    }
  }, []);

  const [channel, setChannel] = useState<IChannelCreate>({
    channel_name: "",
    user_limit: 100,
    channel_state_code: ChannelState.NotUsed,
  });

  // 신규 게시글 정보를 백엔드 API로 전달해서 등록처리
  const ChannelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // axios나 fetch()를 통해 백엔드 RESTful API를 호출한다.

    // 웹브라우저 로컬스토리지 저장소에서 로그인 사용자 JWT 인증토큰문자열 조회
    const token = localStorage.getItem("token");

    try {
      // Case1) axois를 이용한 데이터 처리
      // axios.post("api 주소", 전달데이터, 옵션);
      const response = await axios.post(
        "http://localhost:5000/api/channel/create",
        channel,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("axios를 통해 호출한 게시글 등록 결과:", response);

      if (response.data.code == 200) {
        alert("등록 완료");
        router.push("/chat/list");
      } else {
        console.error("백엔드 에러 발생", response.data.msg);
      }
    } catch (err) {
      console.log("백엔드 api 호출 에러 발생");
    }
  };

  // Case2) fetch()를 이용한 데이터 처리
  //     const response = await fetch("http://localhost:5000/api/article/create", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(blog),
  //     });

  //     const result = await response.json();

  //     if (result.code == 200) {
  //       alert("등록 완료");
  //       router.push("/mypage/blog/list");
  //     } else {
  //       console.error("백엔드 에러 발생", result.msg);
  //     }
  //   } catch (err) {
  //     console.log("백엔드 api 호출 에러 발생");
  //   }
  // };

  return (
    <div className="mt-24 ml-36 mr-36">
      <form onSubmit={ChannelSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              신규 채널 생성
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              신규 채팅 채널을 개설합니다.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  채널명
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      id="channel_name"
                      name="channel_name"
                      type="text"
                      value={channel.channel_name}
                      onChange={(e) => {
                        setChannel({
                          ...channel,
                          channel_name: e.target.value,
                        });
                      }}
                      placeholder="채널명을 입력해주세요."
                      className="block flex-1 border-0  bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col:span-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  동접자 제한 수
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      id="user_limit"
                      name="user_limit"
                      type="text"
                      value={channel.user_limit}
                      onChange={(e) => {
                        setChannel({
                          ...channel,
                          user_limit: Number(e.target.value),
                        });
                      }}
                      className="block flex-1 border-0  bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="display"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  채널사용여부
                </label>
                <div className="mt-2">
                  <select
                    id="channel_state_code"
                    name="channel_state_code"
                    value={channel.channel_state_code}
                    onChange={(e) => {
                      setChannel({
                        ...channel,
                        channel_state_code: Number(e.target.value),
                      });
                    }}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value={ChannelState.Used}>사용함</option>
                    <option value={ChannelState.NotUsed}>사용안함</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            onClick={() => {
              router.push("/chat/list");
            }}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChannelCreate;
