import { Checkbox } from "@chakra-ui/react";

export const CheckboxItem = ({
  checked,
  id,
  onCheckedChange,
}: {
  checked: boolean;
  id: number;
  onCheckedChange: (id: number, isChecked: boolean) => void;
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onCheckedChange(id, event.target.checked);
  };

  return (
    <Checkbox
      defaultChecked={checked}
      onChange={handleChange}
      checked={checked}
    />
  );
};
