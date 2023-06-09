import { Box, Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
export const SplashScreen = () => {
  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box>
          <Typography>Данные с 2021г</Typography>
        </Box>
      </Box>
    </Box>
  );
};
