import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export default function ScreenProfil() {
  const theme = useContext(ThemeContext);
  return (
    <div style={theme}>
      <span> Screen Profile </span>
    </div>
  );
}
