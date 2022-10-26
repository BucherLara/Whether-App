import styled, { css } from "styled-components";

export default function Todo({ todo, toggleCheckTodo, wurst }) {
  return (
    <>
      <Label htmlFor="inputCheckbox">
        <input
          type="checkbox"
          id="inputCheckbox"
          onChange={() => toggleCheckTodo(todo.id)}
          checked={wurst}
        />
        <ListItem weather={todo.weather}>{todo.title}</ListItem>
      </Label>
    </>
  );
}

const Label = styled.label`
  display: flex;
`;

const ListItem = styled.li`
  width: 100%;
  margin: 0.5em 0;
  ${({ weather }) =>
    weather === "good" &&
    css`
      background-color: yellow;
    `}
  ${({ weather }) =>
    weather === "bad" &&
    css`
      background-color: skyblue;
    `}
    ${({ weather }) =>
    weather !== "bad" &&
    weather !== "good" &&
    css`
      background-color: lightgreen;
    `}
`;
