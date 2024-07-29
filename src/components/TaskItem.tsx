import React, { useState, useCallback } from "react";
import { Box, Text, Card, CardBody, ListItem, Input } from "@chakra-ui/react";
import { CheckboxItem } from "./Checkbox";
import { Menubar } from "./Menubar";
import { Todo } from "../server/api";
import {
  useCheckTodoMutate,
  useUpdateTodoMutate,
  useDeleteTodoMutate,
} from "../hooks/useQueryHooks";

export const TaskItem = ({ item, id }: { item: Todo; id: number }) => {
  const { mutate: checkMutate } = useCheckTodoMutate();
  const { mutate: updateMutate } = useUpdateTodoMutate();
  const { mutate: deleteMutate } = useDeleteTodoMutate();

  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(item.title);
  const [isChecked, setIsChecked] = React.useState(item.completed);

  const onEdit = useCallback(() => {
    setIsEditing(!isEditing);
  }, [isEditing]);

  const onCheckedChange = useCallback(
    (id: number, isCompleted: boolean) => {
      setIsChecked(isCompleted);
      checkMutate({ id: id, isCompleted: isCompleted });
    },
    [checkMutate]
  );

  const onBlur = useCallback(() => {
    setIsEditing(false);
    updateMutate({ id: item.id, title: newTitle });

    item.title = newTitle;
  }, [item, newTitle, updateMutate]);

  const handleDelete = useCallback(
    (id: number) => {
      deleteMutate({ id });
    },
    [deleteMutate]
  );

  return (
    <ListItem>
      <Card mt={3}>
        <CardBody
          display="flex"
          alignItems="center"
          gap={10}
          px={4}
          py={3}
          rounded={10}
          justifyContent="space-between"
        >
          <CheckboxItem
            id={item.id}
            onCheckedChange={onCheckedChange}
            checked={isChecked}
          />
          {isEditing ? (
            <Input
              type="text"
              value={newTitle}
              autoFocus
              onChange={(event) => setNewTitle(event.target.value)}
              onBlur={onBlur}
              aria-label="Edit title"
            />
          ) : (
            <Text as={isChecked ? "del" : "p"}>{item.title}</Text>
          )}
          <Box alignSelf="flex-end">
            <Menubar onEdit={onEdit} onDelete={() => handleDelete(item.id)} />
          </Box>
        </CardBody>
      </Card>
    </ListItem>
  );
};
