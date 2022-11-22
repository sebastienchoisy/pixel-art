import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export default function ScreenAccueil() {
  const theme = useContext(ThemeContext);
  return (
    <div style={theme}>
      <span>
        Screen Accueil
      </span>
    </div>
  );
}
