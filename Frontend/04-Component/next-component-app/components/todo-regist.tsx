import { TodoType } from "@/interface/todo";

type TodoRegistProps = {
  todo: TodoType;
  todoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
};

const TodoRegist = ({ todo, onSave, todoChange }: TodoRegistProps) => {
  return (
    <div className="container mx-auto max-w-md p-4">
      <form className="flex mb-4">
        <input
          type="text"
          value={todo.title}
          onChange={todoChange}
          className="flex-grow border border-gray-300 rounded px-4 py-2 mr-2"
          placeholder="Enter a todo"
        />
        <button
          type="button"
          onClick={onSave}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default TodoRegist;
