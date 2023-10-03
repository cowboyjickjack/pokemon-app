import React, { useState } from "react";
import axios from "axios";

function App() {

  const [search, setSearch] = useState("");

  return (
    <div className="App">
      <body>
      <div className="page-wrapper">
        <div className="container">
          <div className="row-search">
            <h2>Pokemon Search!</h2>
            <h4>Please search a pokemon:</h4>
            <input type="text" placeholder="Search" />
            <button type="submit">Search</button>
          <div className="row-pokemon">

          </div>
          </div>
        </div>
      </div>
      </body>
    </div>
  );
}

export default App;
