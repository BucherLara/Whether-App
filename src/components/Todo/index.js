export default function Todo({ todo }) {
  return (
    <>
      <li>
        {todo.title} {todo.weather}
      </li>
    </>
  );
}
