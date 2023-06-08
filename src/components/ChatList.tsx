import { Button, Tabs, Tab } from "@mui/material";
import { actions, createChat } from "../core/store/slices/chat.Slice";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useThunkDispatch } from "../core/store/store";
import { IChat } from "../core/types/models/IChat";
import { getAllMessages } from "../core/store/slices/message.Slice";

export const ChatList = () => {
  const { user, chat } = useSelector((state: RootState) => state);
  const dispatch = useThunkDispatch();
  const [value, setValue] = useState(0);
  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Button onClick={() => dispatch(createChat(user.authInfo.user.id))}>
        создать чат
      </Button>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ height: "80%", borderRight: 1, borderColor: "divider" }}
      >
        {chat.data.chat.map((elem) => (
          <Tab
            key={elem.uuid}
            label={elem.uuid}
            onClick={() => {
              dispatch(actions.setCurrentChat(elem.uuid));
              dispatch(getAllMessages(elem.uuid));
            }}
          ></Tab>
        ))}
      </Tabs>
    </>
  );
};
