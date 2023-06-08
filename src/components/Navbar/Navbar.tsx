import { Box, Button, Tab, Tabs } from "@mui/material";
import { Nav } from "../Wrappers/Nav";
import { Outlet } from "react-router-dom";
import { MaterialUISwitch } from "../UI/MaterialUISwitch";
import { useContext } from "react";
import { ThemeColor } from "../../core/theme/theme";
import { ModalSettings } from "../common/Modal";
import { useSelector } from "react-redux";
import { RootState } from "../../core/store/store";

import { ChatList } from "../ChatList";

export const Navbar = () => {
  const { user } = useSelector((state: RootState) => state);
  const toggleTheme = useContext(ThemeColor);

  return (
    <Box sx={{ display: "flex" }}>
      <Nav>
        <Box sx={{ height: "80%" }}>
          <ChatList />
        </Box>
        <Box sx={{ height: "20%", background: "PeachPuff" }}>
          {user?.authInfo?.user?.email || user?.authInfo?.user?.id || "попа"}
          <ModalSettings />
          <MaterialUISwitch onChange={toggleTheme.toggleColorMode} />
        </Box>
      </Nav>
      <Outlet />
    </Box>
  );
};
