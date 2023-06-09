import { Box, TextField, IconButton, Link } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { getAllMessages } from "../../core/store/slices/message.Slice";
import { RootState, useThunkDispatch } from "../../core/store/store";
import { IChat } from "../../core/types/models/IChat";
import { actions, changeChatName } from "../../core/store/slices/chat.Slice";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
interface elem {
  elem: IChat;
}

export const ChatListElement: FC<elem> = ({ elem }) => {
  const dispatch = useThunkDispatch();
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("");

  const { chat } = useSelector((state: RootState) => state);

  const handleClick = () => {
    const uuid = elem.uuid;
    const userUuid = elem.userUuid;
    dispatch(changeChatName({ uuid, name, userUuid }));
  };

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleSave = () => {
    handleClick();
    setEdit(!edit);
  };

  useEffect(() => {
    if (elem.name === null) return;
    setName(elem.name);
  }, []);
  return (
    <Box key={elem.uuid} sx={{ display: "flex" }}>
      {edit ? (
        <>
          <TextField
            sx={{ width: "75%" }}
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="standard-basic"
            label="Название чата"
            variant="standard"
          />
          <IconButton
            onClick={handleSave}
            aria-label="toggle password visibility"
            edge="end"
          >
            <DoneIcon />
          </IconButton>
          <IconButton
            onClick={handleEdit}
            aria-label="toggle password visibility"
            edge="end"
          >
            <CloseIcon />
          </IconButton>
        </>
      ) : (
        <>
          <Link
            sx={{ width: "80%", textDecoration: "none" }}
            component="button"
            variant="body2"
            color={
              chat.data.currentChatUuid === elem.uuid
                ? "secondary"
                : "text.primary"
            }
            onClick={() => {
              dispatch(actions.setCurrentChat(elem.uuid));
              dispatch(getAllMessages(elem.uuid));
            }}
          >
            {elem.name ?? "Без имени"}
          </Link>
          <IconButton
            onClick={handleEdit}
            aria-label="toggle password visibility"
            edge="end"
          >
            <EditIcon />
          </IconButton>
        </>
      )}
    </Box>
  );
};
