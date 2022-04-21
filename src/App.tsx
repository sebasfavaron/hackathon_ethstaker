import React from 'react';
import './App.css';
import Plot from 'react-plotly.js';

function App() {

  return (
    <div className="App">
      <header className="App-header header">
      <h1>Clientversity</h1>
      </header>
      <Plot data={[
        {
          values: [112, 454, 65, 544],
          labels: ["Blue", "Red", "Yellow", "Orange"],
          type: "pie",
        },
      ]} layout={{height: 400, width: 500, title: '🥧 Pie chart'}} />
      <Plot data={[
        {
          x: [1, 2, 3, 4],
          y: [10, 15, 13, 17],
          mode: 'markers'
        }
      ]} layout={{title: 'Line chart'}} />
    </div>
  );
}

export default App;
