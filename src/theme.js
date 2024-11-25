// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light', // Change to light mode
        primary: {
            main: '#1976d2', // Primary color for buttons
        },
        background: {
            default: '#ffffff', // Background color (white)
            paper: '#f5f5f5',   // Card color (light gray)
        },
        text: {
            primary: '#000000', // Primary text color (black)
            secondary: '#555555', // Secondary text color (gray)
        },
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
    },
});

export default theme;
