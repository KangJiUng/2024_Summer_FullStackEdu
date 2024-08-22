import { useState } from "react";
import { IMessage, UserType, ISendMessage } from "@/interfaces/message";

const Translation = () => {
  // 사용자입력 채팅 메시지 상태값 정의 및 초기화
  const [message, setMessage] = useState<ISendMessage>({
    role: "사용자 메시지를 영어로 번역해주세요.",
    message: "",
  });

  // 챗봇과의 채팅이력 상태값 목록 정의 및 초기화
  const [messageList, setMessageList] = useState<IMessage[]>([]);

  // 메시지 전송 버튼 클릭시 메시지 백엔드 API 전송하기
  const messageSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userMessage: IMessage = {
      user_type: UserType.USER,
      message: message.message,
      send_date: Date.now().toString(),
    };

    // 백엔드로 사용자 입력메시지를 전송하기 전에 사용자 메시지를 메시지목록에 추가하여 화면에 사용자 입력 정보를 출력한다.
    // 왜? 여기서? 현재 WebSocket 기반 실시간 통신이 아니어서 백엔드는 두 번의 응답을 받을 수 없기 때문
    setMessageList((prev) => [...prev, userMessage]);

    const response = await fetch("/api/bot/tranlatebot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    });

    if (response.status === 200) {
      const result = await response.json();
      setMessageList((prev) => [...prev, result.data]);
      setMessage({ role: "", message: "" });
    }
  };

  return (
    <div className="m-4">
      SimpleBot
      {/* 메시지 입력 전송 영역 */}
      <form className="mt-4" onSubmit={messageSubmit}>
        <div>
          <input
            type="text"
            name="role"
            value={message.role}
            // placeholder="챗봇의 역할(목적)을 지정해주세요."
            onChange={(e) => {
              setMessage({ ...message, role: e.target.value });
            }}
            className="block rounded-md w-[300px] border-0 py-1 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder: text-gray-400"
          />
        </div>
        <div className="flex mt-4">
          <input
            type="text"
            name="message"
            value={message.message}
            placeholder="질문을 입력해주세요."
            onChange={(e) => {
              setMessage({ ...message, message: e.target.value });
            }}
            className="block rounded-md w-[500px] border-0 py-1 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder: text-gray-400"
          />
          <button
            type="submit"
            value={message.message}
            className="rounded-md bg-indigo-600 px-3 py-2 ml-4 text-sm font-semibold text-white shadow-sm hover: bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            전송
          </button>
        </div>
      </form>
      {/* 메시지 출력 표시 영역 */}
      <div>
        <ul>
          {messageList.map((msg, index) => (
            <li key={index}>
              {msg.user_type}: {msg.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Translation;
