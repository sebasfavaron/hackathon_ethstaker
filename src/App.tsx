import React from 'react';
import logo from './logo.svg';
import './App.css';
import Plot from 'react-plotly.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
      </header>
      <Plot data={[]} layout={{title: 'Titulo'}} />
    </div>
  );
}

export default App;
