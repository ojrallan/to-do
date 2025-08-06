import { useState, useContext } from "react";
import Task from "./components/Task";
import axios from "axios";
import { TodoContext } from "./context/TodoContext";
import Completion from "./components/Completion";

function App() {
  const { todos, setTodos } = useContext(TodoContext);
  const [title, setTitle] = useState("");

  function formatDate(date = new Date()) {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const dayName = days[date.getDay()];
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = months[date.getMonth()];
    const yyyy = date.getFullYear();

    return `${dayName}, ${dd}-${mm}-${yyyy}`;
  }

  const today = formatDate();

  const addTodo = (e) => {
    e.preventDefault();
    //Ensure valid content is being submitted
    if (title === "" || title.length < 4) {
      window.alert("Please enter a valid task");
      setTitle("");
      return;
    } else if (title.length > 20) {
      window.alert("Make the task name more concise, please");
      setTitle("");
      return;
    } else {
      const formattedTitle =
        title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();
      axios
        .post("http://localhost:5000/todos", { title: formattedTitle })
        .then((res) => {
          setTodos([...todos, res.data]);
          setTitle("");
        });
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-stone-300">
      <div className="w-[400px] h-auto min-h-[400px] bg-white py-5 rounded-sm">
        <h1 className="text-orange-600 text-center text-3xl">
          <i>Today's Tasks </i>
        </h1>
        <p className="text-center text-xs mt-1">{`(${today})`}</p>
        <div className="mx-auto w-fit mt-5">
          <form className="flex gap-2">
            <input
              className="border border-gray-300 px-1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button
              className="bg-green-400 rounded-sm py-1 px-3"
              onClick={addTodo}
            >
              Add
            </button>
          </form>
        </div>

        <div className="w-full flex justify-center items-center ">
          <div className="h-[200px] w-[230px] overflow-auto thin-scrollbar shadow-inner mt-2 bg-stone-100">
            {todos.map((todo) => (
              <Task key={todo.id} todo={todo} />
            ))}
          </div>
        </div>
        {/*Display Percentage completed */}
        <Completion />
      </div>
    </div>
  );
}

export default App;
