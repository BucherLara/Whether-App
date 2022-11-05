import Svg from "../Svg";
import Button from "../Button";
import {
  ModalBackground,
  Modal,
  Form,
  Input,
  ButtonGroup,
} from "./AddTodo.styled.js";
import { useState } from "react";

export default function AddTodo({ addTodo }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    addTodo(data);
    console.log(data);
    setTimeout(() => {
      setIsOpen();
    }, 3000);
  }

  return (
    <>
      <Button
        type="button"
        variant="floating"
        onClick={() => {
          setIsOpen((isOpen) => !isOpen);
        }}
      >
        <Svg variant="add" color="#fff" />
      </Button>
      {isOpen && (
        <ModalBackground>
          <Modal>
            <Button
              type="button"
              variant="close"
              onClick={() => {
                setIsOpen((isOpen) => !isOpen);
              }}
            >
              <Svg variant="close" color="#3d3d3d" />
            </Button>

            <Form onSubmit={handleSubmit}>
              <label htmlFor="input">
                <Input
                  name="title"
                  id="input"
                  type="text"
                  maxLength="20"
                  required
                ></Input>
              </label>

              <label>
                <input name="weather" type="radio" value="always" />
                always
              </label>
              <label>
                <input name="weather" type="radio" value="good" />
                good
              </label>
              <label>
                <input name="weather" type="radio" value="bad" />
                bad
              </label>
              <ButtonGroup>
                <button type="submit">submit</button>
                <button
                  onClick={() => {
                    setIsOpen((isOpen) => !isOpen);
                  }}
                  type="button"
                >
                  cancel
                </button>
              </ButtonGroup>
            </Form>
          </Modal>
        </ModalBackground>
      )}
    </>
  );
}
