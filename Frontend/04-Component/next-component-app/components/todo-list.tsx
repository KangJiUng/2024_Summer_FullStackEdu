import { TodoType } from "@/interface/todo";

type TodoListProps = {
  todos: TodoType[];
  removeItem: (index: number) => void;
};

const TodoList = ({ todos, removeItem }: TodoListProps) => {
  return (
    <div className="container mx-auto max-w-md p-4">
      {/* 할일목록영역 */}
      <ul>
        {todos.map((item, index) => (
          <li
            key={index}
            className="flex items-center justify-between border-b border-gray-300 py-2"
          >
            <span>{item.title}</span>
            <button
              type="button"
              onClick={() => removeItem(index)}
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

export default TodoList;
