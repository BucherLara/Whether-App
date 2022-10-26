import styled, { css } from "styled-components";

export default function Todo({ todo }) {
  return (
    <>
      <ListItem weather={todo.weather}>{todo.title}</ListItem>
    </>
  );
}

const ListItem = styled.li`
  ${({ weather }) =>
    weather === "good" &&
    css`
      background-color: yellow;
    `}
  ${({ weather }) =>
    weather === "bad" &&
    css`
      background-color: blue;
    `}
    ${({ weather }) =>
    weather !== "bad" &&
    weather !== "good" &&
    css`
      background-color: green;
    `}
`;
