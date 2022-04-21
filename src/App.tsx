import React, {useState} from 'react';
import './App.css';
import Plot from 'react-plotly.js';
import {TheTable} from "./TheTable";
import {Epoch} from "./types";
import {getLastEpoch} from "./api";

function App() {
    const [epochs, setEpochs] = useState<Epoch[]>([]);

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
            ]} layout={{height: 400, width: 500, title: '🥧 Pie chart'}}/>
            <Plot data={[
                {
                    x: [1, 2, 3, 4],
                    y: [10, 15, 13, 17],
                    mode: 'markers'
                }
            ]} layout={{title: 'Line chart'}}/>
            <TheTable epochs={epochs}/>
        </div>
    );
}

export default App;
