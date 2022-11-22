import React from 'react';

export const themes = {
  light: {
    color: 'black',
    backgroundColor: 'white',
  },
  dark: {
    color: 'white',
    backgroundColor: 'dimgrey',
  },
};

export const ThemeContext = React.createContext(themes.light);
