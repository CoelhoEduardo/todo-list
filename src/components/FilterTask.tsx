import { Select } from "@chakra-ui/react";

export const FilterTask = ({
  onChange,
}: {
  onChange: React.ChangeEventHandler<HTMLSelectElement> | undefined;
}) => {
  return (
    <Select onChange={onChange}>
      <option value="">All</option>
      <option value="true">Done</option>
      <option value="false">ToDo</option>
    </Select>
  );
};
