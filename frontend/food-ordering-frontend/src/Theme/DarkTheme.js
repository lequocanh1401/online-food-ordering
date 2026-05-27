import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
    palette: {
        mode: "dark", // Ép toàn bộ Material UI sang màu tối
        primary: {
            main: "#e91e63", // Màu Hồng đặc trưng của Zosh
        },
        secondary: {
            main: "#5A20CB",
        },
        black: {
            main: "#242B2E",
        },
        background: {
            main: "#000000",
            default: "#0D0D0D",
            paper: "#0D0D0D", // Đổi màu nền của các Popup thành đen nhám
        },
        textColor: {
            main: "#111111",
        },
    },
});