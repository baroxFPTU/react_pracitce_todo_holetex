import React, {
  useCallback,
  useRef,
  useState,
  createContext,
  useEffect,
} from "react";
import Button from "@atlaskit/button";
import Textfield from "@atlaskit/textfield";
import TodoList from "./components/TodoList";

export const AppContext = createContext();

function App() {
  const [todoList, setTodoList] = useState([]);
  const [textInput, setTextInput] = useState("");
  const inputRef = useRef();
  const isDisabled = useRef(true);

  useEffect(() => {
    const localStorageTodoList = localStorage.getItem("todoList");
    if (localStorageTodoList) {
      setTodoList(JSON.parse(localStorageTodoList));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  const handleTextInputChange = useCallback((e) => {
    const inputValue = e.target.value;
    isDisabled.current = false;
    if (inputValue.trim() === "") {
      isDisabled.current = true;
    }
    setTextInput(inputValue);
  }, []);

  const hanldeAddTodo = useCallback(() => {
    setTodoList([
      ...todoList,
      {
        id: Date.now(),
        name: textInput,
        isCompleted: false,
      },
    ]);
    setTextInput("");
    inputRef.current.focus();
  }, [textInput, todoList]);

  const handleCheckEvent = (id) => {
    setTodoList((prevState) => {
      return prevState.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: true } : { ...todo }
      );
    });
  };

  return (
    <AppContext.Provider value={[handleCheckEvent]}>
      <div className="container">
        <h3>Todoist</h3>
        <Textfield
          name="add-todo"
          placeholder="Enter your task..."
          elemAfterInput={
            <Button
              isDisabled={isDisabled.current}
              appearance="primary"
              onClick={hanldeAddTodo}
            >
              Add
            </Button>
          }
          value={textInput}
          onChange={handleTextInputChange}
          ref={inputRef}
        ></Textfield>

        <TodoList todoList={todoList} />
      </div>
    </AppContext.Provider>
  );
}

export default App;
