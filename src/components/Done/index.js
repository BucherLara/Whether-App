//DONE

import { DoneList as List } from "./DoneList.styled.js";
import Todo from "../Todo/index.js";

export default function Done({ todos, toggleCheckTodo, curry }) {
  return (
    <>
      <h2>Done ({todos.length})</h2>

      {
        <List>
          {todos.map((todo) => {
            return (
              <Todo
                key={todo.id}
                todo={todo}
                toggleCheckTodo={toggleCheckTodo}
                wurst={curry}
              />
            );
          })}
        </List>
      }
    </>
  );
}
