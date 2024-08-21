// 사용자간 기초 채팅기능구현 컴포넌트
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { IMessage } from "@/interfaces/message";

// 채팅 클라이언트 socket 객체 참조하기
import { socket } from "@/library/socket";

const Chat = () => {
  // 라우터 객체 생성
  const router = useRouter();

  // 현재 사용자 고유번호 상태값 정의
  const [memberId, setMemberId] = useState<number>(1);

  // 채팅 메시지 입력 요소 바인딩 텍스트 상태값 정의
  const [message, setMessage] = useState<string>("");

  // 채팅 메시지 목록(채팅이력정보) 상태값 정의
  const [messageList, setMessageList] = useState<IMessage[]>([
    {
      member_id: 1,
      name: "둘리",
      profile: "http://localhost:5000/img/user1.png",
      message: "하이",
      send_date: "2024-08-21 10:00:00",
    },
    {
      member_id: 2,
      name: "지지",
      profile: "http://localhost:5000/img/user2.png",
      message: "ㅇㅇ",
      send_date: "2024-08-21 10:01:00",
    },
    {
      member_id: 3,
      name: "홍길똥",
      profile: "http://localhost:5000/img/user3.png",
      message: "ㅎㅇ~~",
      send_date: "2024-08-21 10:05:00",
    },
  ]);

  // useEffect 훅은 CSR환경에서 작동되고 useRouter 훅은 SSR/SCR 순서로 2번 작동된다.
  // useEffect 훅에서 useRouter 훅을 이용하여 URL 키값이 추출안되는 문제는 useRouter.isReady 값을 이용하여 해결 가능
  // useRouter.isReady 값의 기본은 false -> true로 변경되는 시점에 관련 기능 구현하면 된다.
  useEffect(() => {
    console.log("현재 URL 주소에서 사용자 고유번호 추출하기:", router.query.id);

    // URL 주소를 통해 사용자 고유번호가 전달된 경우에만 실행
    if (router.query.id != undefined) {
      // 현재 사용자 고유번호 상태값 설정
      setMemberId(Number(router.query.id));
    }
  }, [router.isReady]);

  // 최초 1회 화면이 렌더링(마운팅)되는 시점에 실행되는 useEffect 함수
  // 프로젝트 루트에 next.config.mjs 파일내 reactStrictMode 값을 false로 변경해야 정확히 1회만 실행
  // 채팅 서버와 연결되는 클라이언트 채팅 소켓 객체 생성 및 각종 채팅 이벤트 기능 구현 영역
  useEffect(() => {
    // 최초 화면이 렌더링되는 시점에 서버소켓 연결
    socket.connect();

    // 서버소켓과 연결이 완료되면 실행되는 이벤트함수
    // 서버소켓과 연결이 완료되면 자동으로 client 소켓에서 connect 이벤트가 실행되고 connect이벤트가 실행되면 처리할 이벤트처리할 기능 구현
    socket.on("connect", () => {
      console.log("정상적으로 서버소켓과 연결되었습니다.");
    });
  }, []);

  // 채팅 메시지 전송 이벤트 처리 함수
  const sendMessage = () => {};

  return (
    <div className="flex h-screen antialiased text-gray-800 mt-14 pb-10">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <div className="flex flex-col flex-auto h-full p-6">
          <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
            {/* 메시지 목록 출력영역 */}
            <div className="flex flex-col h-full overflow-x-auto mb-4">
              <div className="flex flex-col h-full">
                <div className="grid grid-cols-12 gap-y-2">
                  {messageList.map((msg, index) =>
                    msg.member_id === memberId ? (
                      <div
                        key={index}
                        className="col-start-6 col-end-13 p-3 rounded-lg"
                      >
                        <div className="flex items-center justify-start flex-row-reverse">
                          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                            A
                          </div>
                          <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                            <div>{msg.message}</div>
                            <div className="absolute w-[200px] text-right text-xs bottom-0 right-0 -mb-5 text-gray-500">
                              {msg.name} {msg.send_date}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div
                        key={index}
                        className="col-start-1 col-end-8 p-3 rounded-lg"
                      >
                        <div className="flex flex-row items-center">
                          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                            A
                          </div>
                          <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                            <div>{msg.message}</div>
                            <div className="absolute w-[200px] text-xs bottom-0 left-0 -mb-5 text-gray-500">
                              {msg.name} {msg.send_date}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* 메시지 입력 및 보내기 영역 */}
            <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
              {/* 파일첨부버튼영역 */}
              <div>
                <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                  </svg>
                </button>
              </div>

              {/* 메시지 입력요소 영역 */}
              <div className="flex-grow ml-4">
                <div className="relative w-full">
                  <input
                    type="text"
                    name={message}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                    className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                  />
                </div>
              </div>

              {/* 메시지 전송버튼 영역 */}
              <div className="ml-4">
                <button
                  type="button"
                  onClick={sendMessage}
                  className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                >
                  <span>Send</span>
                  <span className="ml-2">
                    <svg
                      className="w-4 h-4 transform rotate-45 -mt-px"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
