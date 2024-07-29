import React, { FormEvent, useCallback, useState } from "react";
import {
  Button,
  FormControl,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";
import { useTodoMutate } from "../hooks/useTodosData";

export const CreateTask = ({
  id,
  inputRef,
}: {
  id: number;
  inputRef: React.RefObject<HTMLInputElement>;
}) => {
  const [title, setTitle] = useState("");
  const { mutate } = useTodoMutate();
  const color = useColorModeValue("dark", "light");

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(event.target.value);
    },
    []
  );

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      const newTodo = {
        id: id,
        userId: 10,
        title: title,
        completed: false,
      };

      mutate(newTodo);
      setTitle("");
      inputRef.current?.focus();
    },
    [title, id]
  );

  return (
    <form onSubmit={handleSubmit}>
      <FormControl display="flex" gap={2} w="max-content" justifyItems="center">
        <Input
          type="text"
          ref={inputRef}
          id="title"
          px={3}
          py={2}
          borderColor={color === "dark" ? "black" : "white"}
          value={title}
          onChange={handleChange}
          placeholder="New task"
        />
        <Button
          type="submit"
          isDisabled={!title}
          bgColor={!title ? "gray.300" : "black"}
          rounded={8}
          textColor="white"
          px={4}
        >
          Create
        </Button>
      </FormControl>
    </form>
  );
};
