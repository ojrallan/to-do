import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import axios from "axios";

const Task = ({ todo }) => {
  const { setTodos } = useContext(TodoContext);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/todos/${id}`);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Failed to delete todo: ", error);
    }
  };

  const handleStatusChange = async (id, currentCompleted) => {
    try {
      await axios.put(`http://localhost:5000/todos/${id}`, {
        completed: !currentCompleted,
      });
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    } catch (error) {
      console.error("Failed to update status");
    }
  };

  return (
    <div className="w-[200px] px-2 mt-2 rounded-sm flex justify-between items-center h-fit">
      <div className="flex items-center justify-center gap-2 h-full cursor-pointer">
        <div className="h-1 w-1 flex rounded-full bg-black"></div>
        <h1
          className={`cursor-pointer select-none ${todo.completed ? "line-through" : null}`}
          onClick={() => handleStatusChange(todo.id, todo.completed)}
        >
          {todo.title}
        </h1>
      </div>

      <div className="flex gap-2">
        {/* Bin icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4 text-gray-500 cursor-pointer hover:text-red-500"
          onClick={() => handleDelete(todo.id)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>

        {/* Check Mark */}
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`size-4  cursor-pointer ${
            todo.completed ? "text-green-500 font-extrabold" : "text-gray-500"
          }`}
          onClick={() => handleStatusChange(todo.id, todo.completed)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg> */}
      </div>
    </div>
  );
};

export default Task;
