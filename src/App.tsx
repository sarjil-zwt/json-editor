import React from "react";
import "./App.css";
import JsonTreeViewer from "./JsonTreeViewer";
import jsonData from "./data.json";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>JSON Tree Viewer</h1>
      </header>
      <JsonTreeViewer data={jsonData} />
    </div>
  );
}

export default App;
