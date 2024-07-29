import { Box, Heading, Text, useColorModeValue } from "@chakra-ui/react";

export const Header = ({
  completedTodosCount,
  allTodosCount,
}: {
  completedTodosCount: number | undefined;
  allTodosCount: number;
}) => {
  const color = useColorModeValue("dark", "light")
  return (
    <Box display="flex" alignItems="center" p={2} gap={16}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Heading as="h1" size="3xl" fontWeight="bold">
          Todo List
        </Heading>
        <Text fontSize="medium" textAlign="center">
          Let's do it, don't stop, keep working hard!
        </Text>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgColor={color === "dark" ? "black": "white"}
        boxSize={32}
        rounded={"100%"}
      >
        <Text textColor={color === "dark" ? "white" : "black"} fontSize="3xl">
          {completedTodosCount}/{allTodosCount}
        </Text>
      </Box>
    </Box>
  );
};
