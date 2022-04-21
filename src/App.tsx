import React, {useState} from 'react';
import './App.css';
import Plot from 'react-plotly.js';
import {TheTable} from "./TheTable";
import {Epoch} from "./types";
import {getLastEpoch} from "./api";
import {ThePie} from "./ThePie";

function App() {
    const [epochs, setEpochs] = useState<Epoch[]>([]);

    const fetchEpochs = async () => {
        const _epochs = await getLastEpoch();
        setEpochs([_epochs]);
    };

    useState(() => {
        fetchEpochs().finally();
    });

    return (
        <div className="App">
            <header className="App-header header">
                <h1>Clientversity</h1>
            </header>
            <ThePie epoch={epochs[0]} />
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
