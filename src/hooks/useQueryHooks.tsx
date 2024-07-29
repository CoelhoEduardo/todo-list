import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Todo,
  checkTodo,
  deleteTodo,
  getTodos,
  postTodo,
  updateTodo,
} from "../server/api";

export function useTodoData() {
  const query = useQuery<Todo[], Error>({
    queryKey: ["todos"],
    queryFn: getTodos,
    gcTime: Infinity,
  });

  return query;
}

export function useTodoMutate() {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: postTodo,
    onSuccess: (newTodo: Todo) => {
      queryClient.setQueryData<Todo[]>(["todos"], (oldTodos) => {
        const maxId =
          oldTodos?.reduce((max, todo) => Math.max(max, todo.id), 0) || 0;
        newTodo.id = maxId + 1;
        return [...(oldTodos || []), newTodo];
      });
    },
  });

  return mutate;
}

export function useCheckTodoMutate() {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: async ({
      id,
      isCompleted,
    }: {
      id: number;
      isCompleted: boolean;
    }) => {
      await checkTodo(id, isCompleted);
      return { id, isCompleted };
    },
    onSuccess: ({ id, isCompleted }: { id: number; isCompleted: boolean }) => {
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]);
      if (previousTodos) {
        const updatedTodos = previousTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: isCompleted } : todo
        );
        queryClient.setQueryData(["todos"], updatedTodos);
      }
    },
  });

  return mutate;
}

export function useUpdateTodoMutate() {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: ({ id, title }: { id: number; title: string }) =>
      updateTodo(id, title),
    onSuccess: (updatedTodo: Todo) => {
      queryClient.setQueryData<Todo[]>(["todos"], (oldTodos) => {
        return (
          oldTodos?.map((todo) =>
            todo.id === updatedTodo.id ? updatedTodo : todo
          ) || []
        );
      });
    },
  });

  return mutate;
}

export function useDeleteTodoMutate() {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      await deleteTodo(id);
      return { id };
    },
    onSuccess: ({ id }: { id: number }) => {
      queryClient.setQueryData<Todo[]>(["todos"], (oldTodos) => {
        return oldTodos?.filter((todo) => todo.id !== id) || [];
      });
    },
  });

  return mutate;
}
