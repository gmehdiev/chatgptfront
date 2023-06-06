import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import * as yup from "yup";
import { FC, useState } from "react";
import { Formik } from "formik";

interface AuthForm {
  title: string;
  handleClick: (email: string, password: string) => void;
}

export const AuthForm: FC<AuthForm> = ({ title, handleClick }) => {
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Введите правильный адрес электронной почты")
      .required("Поле email является обязательным"),
    password: yup
      .string()
      .required("Поле пароль является обязательным")
      .min(8, "Пароль должен содержать минимум 8 символов"),
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [show, setShow] = useState(false);
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={(value) => {
        handleClick(value.email, value.password);
      }}
    >
      {({ errors, touched, handleSubmit, setFieldError, setFieldValue }) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            width: "50%",
          }}
          component="form"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            id="outlined-basic"
            name="email"
            size="small"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setFieldError("email", "");
              setFieldValue("email", e.target.value);
            }}
            error={!!(errors.email && touched.email)}
            helperText={errors.email && touched.email ? errors.email : null}
          />
          <TextField
            sx={{ mt: 2 }}
            id="outlined-password-input"
            label="Password"
            size="small"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setFieldError("password", "");
              setFieldValue("password", e.target.value);
            }}
            error={!!(errors.password && touched.password)}
            helperText={
              errors.password && touched.password ? errors.password : null
            }
            type={show ? "text" : "password"}
            autoComplete="current-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => {
                      setShow(!show);
                    }}
                    edge="end"
                  >
                    {show ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            {title}
          </Button>
        </Box>
      )}
    </Formik>
  );
};
