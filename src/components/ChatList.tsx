import { Button, Box, Link, IconButton, TextField } from "@mui/material";
import { actions, createChat } from "../core/store/slices/chat.Slice";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useThunkDispatch } from "../core/store/store";
import { getAllMessages } from "../core/store/slices/message.Slice";

import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { ChatListElement } from "./common/ChatListElement";

export const ChatList = () => {
  const { user, chat } = useSelector((state: RootState) => state);
  const dispatch = useThunkDispatch();
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState("");
  const handleClick = () => {
    console.log("asdasd");
  };

  return (
    <>
      <Button
        onClick={() => dispatch(createChat(user.authInfo.user.id ?? "1"))}
      >
        Cоздать чат
      </Button>
      <Box sx={{ height: "70vh", overflow: "auto" }}>
        {chat.data.chat.map((elem) => (
          <ChatListElement key={elem.uuid} elem={elem} />
        ))}
      </Box>
    </>
  );
};
