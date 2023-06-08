import { Button, TextField } from "@mui/material";
import { Wrapper } from "../../components/Wrappers/Wrapper";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useThunkDispatch } from "../../core/store/store";
import {
  getGptAnswer,
  sendMessage,
} from "../../core/store/slices/message.Slice";
import { getGpt } from "../../core/utils/Message";

export const MainPage = () => {
  const { user, chat, message } = useSelector((state: RootState) => state);
  const [value, setValue] = useState("");
  const handleClick = () => {
    console.log(value);
    const content = value;
    const uuid = chat.data.currentChatUuid;
    dispatch(sendMessage({ uuid, content }));
    dispatch(getGptAnswer(uuid));

    setValue("");
  };

  const dispatch = useThunkDispatch();
  return (
    <Wrapper>
      <TextField
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      ></TextField>
      <Button
        onClick={() => {
          handleClick();
        }}
      >
        asdasd
      </Button>
      {message.data.map((elem) => (
        <div key={elem.uuid}>{elem.content}</div>
      ))}
    </Wrapper>
  );
};
