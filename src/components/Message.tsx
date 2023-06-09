import { FC, useEffect, useState } from "react";
import { IMessage } from "../core/types/models/IMessage";
import { MessageWrap } from "./Wrappers/MessageWrap";
import { Avatar, Box, Typography } from "@mui/material";
import dayjs from "dayjs";

interface Message {
  value: IMessage;
}

export const Message: FC<Message> = ({ value }) => {
  const [paragraph, setParagraph] = useState<string[]>([]);
  const [date, setDate] = useState("");

  useEffect(() => {
    const fragments = value.content.split("\n");
    setParagraph(fragments);
    setDate(dayjs(value.createdAt).format("MM/DD/YYYY HH:mm:ss"));
  }, [value]);
  return (
    <MessageWrap>
      <Box
        sx={
          value.role === "user"
            ? {
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "end",
              }
            : {
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "end",
              }
        }
      >
        {value.role === "assistant" ? (
          <Avatar
            sx={{ mt: "auto", mb: 0.5, mr: 2 }}
            alt="gpt"
            src="https://sun9-42.userapi.com/impg/gNFCnYSo_OFoE-vnz4BwazGLS70FPyo1DZr1mw/U7kGS8ORcLc.jpg?size=750x500&quality=96&sign=a4373491c56d11c78f127ce86cb22a98&type=album"
          />
        ) : (
          <></>
        )}

        <Box>
          <Typography sx={{ color: "text.secondary" }}>{date}</Typography>
          <Box
            sx={
              value.role === "user"
                ? {
                    backgroundColor: "background.paper",
                    borderRadius: "10px",
                    padding: "10px",
                    color: "text.primary",
                  }
                : {
                    backgroundColor: "background.paper",
                    borderRadius: "10px",
                    padding: "10px",
                    color: "text.primary",
                  }
            }
          >
            <Box sx={{ maxWidth: "90%" }}>
              {paragraph.map((elem, index) => (
                <Typography key={index}>{elem}</Typography>
              ))}
            </Box>
          </Box>
        </Box>

        {value.role === "user" ? (
          <Avatar
            sx={{ mt: "auto", mb: 0.5, ml: 2 }}
            alt="gpt"
            src="https://sun9-7.userapi.com/impg/2bUhmw8DOT-2_hVHtb5WaBdN1jUKBqDYfA54ow/SIsIYfuZauw.jpg?size=564x552&quality=95&sign=2f90ea133ef3b462fe00448824b02931&type=album"
          />
        ) : (
          <></>
        )}
      </Box>
    </MessageWrap>
  );
};
