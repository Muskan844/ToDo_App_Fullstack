import { useState, useEffect } from "react";
import ToDo from "./components/ToDo";
import axios from "axios";

function App() {
  const [todo, setTodo] = useState([]);
  const [text, setText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [todoId, setTodoId] = useState("");

  const baseURL = "http://localhost:5000";

  useEffect(() => {
    getAlltoDo(setTodo);
  }, []);

  const updateMode = (_id, text) => {
    setIsUpdating(true);
    setText(text);
    setTodoId(_id);
  };

  const getAlltoDo = (setTodo) => {
    axios.get(baseURL).then(({ data }) => {
      console.log("data --->", data);
      setTodo(data);
    });
  };

  const addToDo = (text, setText, setTodo) => {
    axios
      .post(`${baseURL}/save`, { text })
      .then((data) => {
        console.log(data);
        setText("");
        getAlltoDo(setTodo);
      })
      .catch((err) => console.log(err));
  };

  const updateToDo = (todoId, text, setTodo, setText, setIsUpdating) => {
    axios
      .put(`${baseURL}/update`, { _id: todoId, text })
      .then((data) => {
        console.log(data);
        setText("");
        setIsUpdating(false);
        getAlltoDo(setTodo);
      })
      .catch((err) => console.log(err));
  };

  const deleteToDo = (_id, setTodo) => {
    axios
      .delete(`${baseURL}/delete`, { data:{_id}})
      .then(() => {
        getAlltoDo(setTodo);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="App">
        <div className="container">
          <h1>ToDo App</h1>
          <div className="top">
            <input
              type="text"
              placeholder="Add ToDos..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div
              className="add"
              onClick={
                isUpdating
                  ? () =>
                      updateToDo(todoId, text, setTodo, setText, setIsUpdating)
                  : () => addToDo(text, setText, setTodo)
              }
            >
              {isUpdating ? "Update" : "Add"}
            </div>
          </div>
          <div className="list">
            {todo.map((item) => (
              <ToDo
                key={item._id}
                text={item.text}
                updateMode={() => updateMode(item._id, item.text)}
                deleteToDo={()=> deleteToDo(item._id, setTodo)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
