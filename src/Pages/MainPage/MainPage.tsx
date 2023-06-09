import { Box, Button } from "@mui/material";
import { Wrapper } from "../../components/Wrappers/Wrapper";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useThunkDispatch } from "../../core/store/store";
import {
  getGptAnswer,
  sendMessage,
} from "../../core/store/slices/message.Slice";
import { Message } from "../../components/Message";
import { StyledTextarea } from "../../components/Wrappers/StyledTextarea";
import { SplashScreen } from "../../components/SplashScreen";

export const MainPage = () => {
  const { chat, message } = useSelector((state: RootState) => state);
  const [value, setValue] = useState("");
  const handleClick = async () => {
    console.log(value);
    const content = value;
    const uuid = chat.data.currentChatUuid;
    await dispatch(sendMessage({ uuid, content }));
    dispatch(getGptAnswer(uuid));

    setValue("");
  };

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [message.data, chat.data.currentChatUuid]);

  const scrollToBottom = () => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer === null) return;
    setTimeout(() => {
      chatContainer.scrollTop =
        chatContainer.scrollHeight - chatContainer.clientHeight;
    }, 0);
  };

  const dispatch = useThunkDispatch();
  return (
    <Wrapper>
      {chat.data.currentChatUuid && typeof message.data !== "undefined" ? (
        <>
          <Box sx={{ overflow: "auto" }} ref={chatContainerRef}>
            {message.data.map((elem) => (
              <Message key={elem.uuid} value={elem}></Message>
            ))}
          </Box>

          <Box sx={{ width: "100%", marginTop: "auto" }}>
            <StyledTextarea
              maxRows={4}
              sx={{ width: "90%" }}
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            ></StyledTextarea>
            <Button
              onClick={() => {
                handleClick();
              }}
            >
              asdasd
            </Button>
          </Box>
        </>
      ) : (
        <SplashScreen />
      )}
    </Wrapper>
  );
};
