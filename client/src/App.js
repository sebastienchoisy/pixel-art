import logo from './logo.svg';
import './App.css';
import React from "react";
import Board from "./components/board/Board";

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
        .then((res) => res.json())
        .then((data) => setData(data.message));
  }, []);
  return (
      <div className="App">
        {/*<header className="App-header">*/}
        {/*  <img src={logo} className="App-logo" alt="logo" />*/}
        {/*  <p>{!data ? "Loading..." : data}</p>*/}
        {/*</header>*/}
          <div className="board-container">
              <Board colsNb="50" linesNb="50" ></Board>
          </div>
      </div>
  );
}

export default App;
