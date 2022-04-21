import React from 'react';
import logo from './logo.svg';
import './App.css';
import Plot from 'react-plotly.js';

function App() {

  return (
    <div className="App">
      <header className="App-header">

      </header>
      <Plot data={[
        {
          values: [112, 454, 65, 544],
          labels: ["Blue", "Red", "Yellow", "Orange"],
          type: "pie",
        },
      ]} layout={{height: 400, width: 500}} />
    </div>
  );
}

export default App;
