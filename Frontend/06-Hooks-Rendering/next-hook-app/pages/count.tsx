// useState 기본 사용법 알아보기
import { useState } from "react";

const Count = () => {
  // 카운트 값 상태 데이터 정의 및 초기화
  const [count, setCount] = useState<number>(0);

  const plusCount = () => {
    setCount(count + 1);
  };
  const minusCount = () => {
    setCount(count - 1);
  };
  const initCount = () => {
    setCount(0);
  };

  return (
    <div className="text-center mt-6">
      {/* 현재 카운트 값 표시 영역 */}
      <div>
        <h1 className="text-lg">{count}</h1>
      </div>
      {/* 카운트 값 증감/초기화 버튼 영역 */}
      <div className="mt-6">
        <button
          // onClick={plusCount}
          onClick={() => {
            setCount(count + 1);
          }}
          className="ml-2 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          증가
        </button>
        <button
          onClick={minusCount}
          className="ml-2 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          감소
        </button>
        <button
          onClick={initCount}
          className="ml-2 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          초기화
        </button>
      </div>
    </div>
  );
};

export default Count;