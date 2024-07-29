import { IconButton, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { HiDotsVertical, HiOutlinePencilAlt, HiTrash } from "react-icons/hi";

type MenubarProps = {
  onEdit: () => void;
  onDelete: () => void;
};

export const Menubar = ({ onEdit, onDelete }: MenubarProps) => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<HiDotsVertical />}
        variant="outline"
      />
      <MenuList>
        <MenuItem icon={<HiOutlinePencilAlt />} onClick={onEdit}>
          Edit
        </MenuItem>
        <MenuItem icon={<HiTrash />} onClick={onDelete}>
          Delete
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
