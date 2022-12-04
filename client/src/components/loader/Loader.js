import React, { useContext } from 'react';
import './loader.css';
import { ThemeContext } from '../../context/theme';

// Composant correspondant au loader
export default function Loader() {
  const theme = useContext(ThemeContext);
  return (
    <div className={`loader ${theme}`}>
      <div className="block">
        <div className="item" />
        <div className="item" />
        <div className="item" />
        <div className="item" />
        <div className="item" />
        <div className="item" />
        <div className="item" />
        <div className="item" />
      </div>
    </div>
  );
}
