import React from 'react';
import { HamburgerIcon, RepeatIcon } from '@chakra-ui/icons';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuIcon,
  MenuDivider,
  IconButton,
} from '@chakra-ui/react';
import ButtonColorMode from '../ButtonColorMode/ButtonColorMode';

export const HeaderMenu = ({ mobile }: any) => (
  <Menu>
    <MenuButton
      display={mobile ? `none` : `flex`}
      as={IconButton}
      aria-label="Options"
      icon={<HamburgerIcon />}
      variant="solid"
      m="auto"
    />
    <MenuList
      display={mobile ? `flex` : `none`}
      backgroundColor="light.background_secondary"
      color="light.text_primary"
      height="fit-content"
      width="20rem"
      p="6"
    >
      <MenuIcon>
        <ButtonColorMode />
      </MenuIcon>
      <MenuDivider />
      <MenuItem borderBottom="1px solid" borderColor="light.border">
        About
      </MenuItem>
      <MenuItem borderBottom="1px solid" borderColor="light.border">
        New Window
      </MenuItem>
      <MenuItem
        borderBottom="1px solid"
        borderColor="light.border"
        icon={<RepeatIcon />}
      >
        Open Closed Tab
      </MenuItem>
      <MenuItem borderBottom="1px solid" borderColor="light.border">
        Open File...
      </MenuItem>
    </MenuList>
  </Menu>
);
