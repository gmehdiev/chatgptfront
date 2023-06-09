import { Box, Button, Modal } from "@mui/material";
import { useState } from "react";
import { Registration } from "../Registration";
import { Login } from "../Login";

export const ModalSettings = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [registrationOrLogin, setRegistrationOrLogin] = useState(false);
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40vw",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };
  return (
    <>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Button onClick={() => setRegistrationOrLogin(!registrationOrLogin)}>
            Go to {registrationOrLogin ? "Registration" : "Login"}
          </Button>
          {registrationOrLogin ? <Login /> : <Registration />}
        </Box>
      </Modal>
    </>
  );
};
