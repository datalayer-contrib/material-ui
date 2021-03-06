import React from 'react';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const theme = createTheme({
  typography: {
    button: {
      fontSize: '1rem',
    },
  },
});

export default function ThemeVariables() {
  return (
    <ThemeProvider theme={theme}>
      <Button>font-size: 1rem</Button>
    </ThemeProvider>
  );
}
