import { use, useState } from "react";

// 컴포넌트 공통 타입 참조하기
import { TodoType } from "@/interface/todo";

import TodoTemplate from "@/components/todo-template";
import TodoRegist from "@/components/todo-regist";
import TodoList from "@/components/todo-list";

const Todo = () => {
  // 단일 할일 정보 상태 정의 및 초기화하기
  const [todo, setTodo] = useState<TodoType>({
    title: "",
    desc: "",
    selected: false,
  });

  // 할일 목록 상태 정의 및 초기화하기
  const [todos, setTodos] = useState<TodoType[]>([]);

  // 할일 등록 텍스트 박스 변경 이벤트 핸들러
  const todoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo({ ...todo, title: e.target.value });
  };

  // 단일 할일 정보 저장 이벤트 핸들러
  const onSave = () => {
    // 할일 목록에 신규 할일 객체 추가하기
    setTodos([...todos, todo]);
  };

  // 할밀 목록 삭제 이벤트 핸들러
  const removeItem = (index: number) => {
    const filterdTodos = todos.filter(
      (item: TodoType, i: number) => i !== index
    );
    setTodos(filterdTodos);
  };

  return (
    <TodoTemplate>
      <TodoRegist todo={todo} todoChange={todoChange} onSave={onSave} />
      <TodoList todos={todos} removeItem={removeItem} />
    </TodoTemplate>
  );
};

export default Todo;
