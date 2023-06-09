import { Button, Tabs, Tab } from "@mui/material";
import { actions, createChat } from "../core/store/slices/chat.Slice";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useThunkDispatch } from "../core/store/store";
import { getAllMessages } from "../core/store/slices/message.Slice";

export const ChatList = () => {
  const { user, chat } = useSelector((state: RootState) => state);
  const dispatch = useThunkDispatch();
  const [value, setValue] = useState(0);
  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    console.log(newValue);
    setValue(newValue);
  };

  return (
    <>
      <Button
        onClick={() => dispatch(createChat(user.authInfo.user.id ?? "1"))}
      >
        Cоздать чат
      </Button>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        sx={{ height: "80%" }}
      >
        {chat.data.chat.map((elem) => (
          <Tab
            key={elem.uuid}
            label={elem.name || "Без названия"}
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
