import axios from "axios";

export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

const apiUrl = "https://jsonplaceholder.typicode.com/todos/";

export const getTodos = async (): Promise<Todo[]> => {
  const response = await axios.get<Todo[]>(apiUrl);
  return response.data;
};

export const postTodo = async (newTodo: Todo): Promise<Todo> => {
  const response = await axios.post<Todo>(apiUrl, newTodo);
  return response.data;
};

export const updateTodo = async (id: number, title: string): Promise<Todo> => {
  const response = await axios.patch(apiUrl + `${id}`, { title });
  return response.data;
};

export const checkTodo = async (
  id: number,
  isCompleted: boolean
): Promise<Todo> => {
  const response = await axios.patch(apiUrl + `/${id}`, {
    completed: isCompleted,
  });
  return response.data;
};

export const deleteTodo = async (id: number): Promise<void> => {
  await axios.delete(apiUrl + `/${id}`);
};
