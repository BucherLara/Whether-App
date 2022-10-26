import { TodoList as List } from "./TodoList.styled.js";
import Todo from "../Todo/index.js";

export default function TodoList({ todos }) {
  return (
    <>
      <h2>Todos to be completed ({todos.length})</h2>

      <List>
        {todos.map((todo) => {
          return <Todo todo={todo} />;
        })}
      </List>
    </>
  );
}
