import { Button, Box } from "@mui/material";
import { createChat } from "../core/store/slices/chat.Slice";
import { useSelector } from "react-redux";
import { RootState, useThunkDispatch } from "../core/store/store";

import { ChatListElement } from "./common/ChatListElement";

export const ChatList = () => {
  const { user, chat } = useSelector((state: RootState) => state);
  const dispatch = useThunkDispatch();

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          onClick={() => dispatch(createChat(user.authInfo.user.id ?? "1"))}
        >
          Cоздать чат
        </Button>
      </Box>

      <Box sx={{ height: "70vh", overflow: "auto" }}>
        {chat.data.chat.map((elem) => (
          <ChatListElement key={elem.uuid} elem={elem} />
        ))}
      </Box>
    </>
  );
};
