import { createContext, useEffect, useState } from "react";
import axios from "axios";

//Create the context
export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  //Fetch tasks from provider
  useEffect(() => {
    const fetchTodos = async () => {
      console.log("fetching");

      try {
        const res = await axios.get("http://localhost:5000/todos");
        setTodos(res.data);

        console.log(res.data);
      } catch (error) {
        setTodos([]);
        console.log("thew", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  return (
    <TodoContext.Provider value={{ todos, setTodos, loading }}>
      {children}
    </TodoContext.Provider>
  );
};
