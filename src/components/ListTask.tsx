import { List } from "@chakra-ui/react";
import { TaskItem } from "./TaskItem";
import { Todo } from "../server/api";

export const ListTask = ({ data }: { data: Todo[] | undefined }) => {
  return (
    <List>
      {Array.isArray(data) &&
        [...data]
          .reverse()
          .map((item) => <TaskItem key={item.id} item={item} />)}
    </List>
  );
};
