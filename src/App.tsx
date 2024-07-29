import * as React from "react";
import {
  ChakraProvider,
  Box,
  VStack,
  Grid,
  theme,
  Spinner,
  HStack,
} from "@chakra-ui/react";
import { useTodoData } from "./hooks/useTodosData";
import { useRef } from "react";
import {
  ColorModeSwitcher,
  Header,
  CreateTask,
  FilterTask,
  ListTask,
} from "./components";

export const App = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { data, isLoading, isError } = useTodoData();
  const [filter, setFilter] = React.useState("");
  const todoId = data?.map((todo) => todo.id) as unknown as number;

  const completedCount = data?.filter((todo) => todo.completed).length;
  const allTodosCount = Array.isArray(data) ? data.length : 0;
  const filteredTodos = data?.filter(
    (todo) => filter === "" || todo.completed.toString() === filter
  );

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Header
              completedTodosCount={completedCount || 0}
              allTodosCount={allTodosCount}
            />
            <HStack gap={12}>
              <CreateTask id={todoId} inputRef={inputRef} />
              <FilterTask onChange={(e) => setFilter(e.target.value)} />
            </HStack>
            {isLoading && <Spinner />}
            {isError && <Box>Sorry, Error fetching data</Box>}
            {!isLoading && <ListTask data={filteredTodos} />}
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
};
