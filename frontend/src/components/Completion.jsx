import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";

const Completion = () => {
  const formatResult = (num) => {
    return Number.isInteger(num) ? num : parseFloat(num.toFixed(2));
  };

  const { todos } = useContext(TodoContext);
  const totalTasks = todos.length;
  const completedTasks = todos.filter((task) => task.completed === true);
  const percentage = (completedTasks.length / totalTasks) * 100;

  const result = formatResult(percentage);
  return (
    <div className="text-center mt-4 text-sm">{`${result}% completed`}</div>
  );
};

export default Completion;
