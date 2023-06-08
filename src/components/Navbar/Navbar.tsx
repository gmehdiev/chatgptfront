import { Box, Button, Tab, Tabs } from "@mui/material";
import { Nav } from "../Wrappers/Nav";
import { Outlet } from "react-router-dom";
import { MaterialUISwitch } from "../UI/MaterialUISwitch";
import { useContext, useState } from "react";
import { ThemeColor } from "../../core/theme/theme";
import { ModalSettings } from "../common/Modal";
import { useSelector } from "react-redux";
import { RootState, useThunkDispatch } from "../../core/store/store";
import { createChat } from "../../core/store/slices/chat.Slice";

export const Navbar = () => {
  const { user, chat } = useSelector((state: RootState) => state);
  const toggleTheme = useContext(ThemeColor);
  const dispatch = useThunkDispatch();
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    console.log(newValue);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Nav>
        <Button onClick={() => dispatch(createChat(user.authInfo.user.id))}>
          создать чат
        </Button>
        <Box sx={{ height: "80%" }}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ height: "100%", borderRight: 1, borderColor: "divider" }}
          >
            {chat.data.chat.map((elem) => (
              <Tab
                key={elem.uuid}
                label={elem.uuid}
                onClick={() => console.log(elem.uuid)}
              ></Tab>
            ))}
          </Tabs>
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
