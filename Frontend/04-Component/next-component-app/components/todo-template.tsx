// todo-regist랑 todo-list 둘 다
import TodoRegist from "./todo-regist";
import TodoList from "./todo-list";

const TodoTemplate = () => {
  return (
    <div>
      <div className="container mx-auto max-w-md p-4">
        <h1 className="text-2xl font-bold mb-4">Todo List</h1>
        <TodoRegist />
        <TodoList />
      </div>
    </div>
  );
};

export default TodoTemplate;
