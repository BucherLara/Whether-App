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

export default function AddTodo({ handleSubmit }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        variant="floating"
        onClick={() => {
          setIsOpen((isOpen) => !isOpen);
        }}
      >
        <Svg
          variant="add"
          color="#fff"
        />
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
              <Svg
                variant="close"
                color="#3d3d3d"
              />
            </Button>

            <Form onSubmit={handleSubmit}>
              <label htmlFor="input">
                <Input
                  id="input"
                  type="text"
                  maxLength="20"
                  required
                ></Input>
              </label>
              <ButtonGroup>
                <label>
                  <input type="radio" />
                  always
                </label>
                <label>
                  <input type="radio" />
                  good
                </label>
                <label>
                  <input type="radio" />
                  bad
                </label>
              </ButtonGroup>
              <button type="submit">submit</button>
              <button type="button">cancel</button>
            </Form>
          </Modal>
        </ModalBackground>
      )}
    </>
  );
}
