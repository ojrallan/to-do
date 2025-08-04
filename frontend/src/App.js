import { useState, useContext } from "react";
import Card from "./components/Card";
import axios from "axios";
import { TodoContext } from "./context/TodoContext";

function App() {
  const { todos, setTodos } = useContext(TodoContext);
  const [title, setTitle] = useState("");

  console.log(todos);

  const addTodo = () => {
    //Ensure valid content is being submitted
    if (title === "" || title.length < 4) {
      window.alert("Please enter a valid task");
      return;
    } else {
      axios.post("http://localhost:5000/todos", { title }).then((res) => {
        setTodos([...todos, res.data]);
        setTitle("");
      });
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-stone-300">
      <div className="w-[400px] h-auto min-h-[200px] bg-white py-5 rounded-sm">
        <h1 className="text-red-400 text-center text-2xl">
          <i>To-Do List </i>
        </h1>
        <div className="mx-auto w-fit flex gap-1">
          <input
            className="border border-gray-300"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            className="bg-green-400 rounded-sm py-1 px-3"
            onClick={addTodo}
          >
            Add
          </button>
        </div>

        <div className="w-full flex justify-center items-center">
          <ul>
            {todos.map((todo) => (
              <Card key={todo.id} todo={todo} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
