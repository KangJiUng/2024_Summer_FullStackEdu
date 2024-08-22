import { useState } from "react";
import { IMessage, UserType } from "@/interfaces/message";

const SimpleBot = () => {
  // 사용자입력 채팅 메시지 상태값 정의 및 초기화
  const [message, setMessage] = useState<string>("");

  // 챗봇과의 채팅이력 상태값 목록 정의 및 초기화
  const [messageList, setMessageList] = useState<IMessage[]>([
    {
      user_type: UserType.USER,
      message: "좋은 아침이야",
      send_date: new Date().toString(),
    },
    {
      user_type: UserType.BOT,
      message: "무엇을 도와드릴까요?",
      send_date: new Date().toString(),
    },
  ]);

  // 메시지 전송 버튼 클릭시 메시지 백엔드 API 전송하기
  const messageSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    if (response.status === 200) {
      const data = await response.json();
      setMessageList((prev) => [...prev, data.message]);
      setMessage("");
    }
  };

  return (
    <div className="m-4">
      SimpleBot
      {/* 메시지 입력 전송 영역 */}
      <form className="flex mt-4" onSubmit={messageSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          className="block rounded-md w-[500px] border-0 py-1 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder: text-gray-400"
        />
        <button
          type="submit"
          value={message}
          className="rounded-md bg-indigo-600 px-3 py-2 ml-4 text-sm font-semibold text-white shadow-sm hover: bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          전송
        </button>
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

export default SimpleBot;
