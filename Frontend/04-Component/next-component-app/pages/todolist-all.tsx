import { useState } from "react";

const TodolistAll = () => {
  // 단일 할일 텍스트 상태값 저장 변수
  const [todo, setTodo] = useState<string>("");

  // 할일 목록 문자열 배열 상태값 정의하기
  const [todos, setTodos] = useState<string[]>([]);

  const todoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  // 할일 저장 이벤트 처리 함수
  const saveTodo = () => {
    setTodos([...todos, todo]);

    setTodo("");
  };

  // 할일 삭제 이벤트 처리 함수
  const removeItem = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    const filterdTodos = todos.filter((item: string, i: number) => i !== index);

    setTodos(filterdTodos);
  };

  return (
    <div className="container mx-auto max-w-md p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>

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

      {/* 할일목록영역 */}
      <ul>
        {todos.map((item: string, index: number) => (
          <li
            key="index"
            className="flex items-center justify-between border-b border-gray-300 py-2"
          >
            <span>{item}</span>
            <button
              type="button"
              onClick={(e) => removeItem(e, index)}
              className="text-red-500 hover:text-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodolistAll;
