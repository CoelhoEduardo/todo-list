import React, { useCallback, useRef, useState } from "react";
import {
  Button,
  FormControl,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";
import { useTodoMutate } from "../hooks/useQueryHooks";

export const CreateTask = ({ id }: { id: number }) => {
  const [title, setTitle] = useState("");
  const { mutate } = useTodoMutate();
  const color = useColorModeValue("dark", "light");
  const inputRef = useRef<HTMLInputElement>(null);

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
    [title, id, mutate, inputRef]
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
