// todo 등록 하는 부분만
import { useState } from "react";

const TodoRegist = () => {
  // 단일 할일 텍스트 상태값 저장 변수
  const [todo, setTodo] = useState<string>("");

  // 할일 목록 문자열 배열 상태값 정의하기
  const [todos, setTodos] = useState<string[]>([]);

  const todoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  const saveTodo = () => {
    setTodos([...todos, todo]);

    setTodo("");
  };

  return (
    <div className="container mx-auto max-w-md p-4">
      {/* 할일 등록 영역  */}
      <form className="flex mb-4">
        <input
          type="text"
          value={todo}
          onChange={todoChange}
          className="flex-grow border border-gray-300 rounded px-4 py-2 mr-2"
          placeholder="Enter a todo"
        />
        <button
          type="button"
          onClick={saveTodo}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default TodoRegist;
