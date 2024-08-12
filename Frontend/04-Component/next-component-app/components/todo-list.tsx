// todo list
import { useState } from "react";

const TodoList = () => {
  return (
    <div className="container mx-auto max-w-md p-4">
      {/* 할일목록영역 */}
      <ul>
        <li className="flex items-center justify-between border-b border-gray-300 py-2">
          <span>할일1입니다.</span>
          <button className="text-red-500 hover:text-red-600">Delete</button>
        </li>
      </ul>
    </div>
  );
};

export default TodoList;
