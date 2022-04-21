import React, {useEffect, useState} from 'react';
import './App.css';
import Plot from 'react-plotly.js';
import {TheTable} from "./TheTable";
import {Epoch} from "./types";
import {getClientAffinityEpoch, getLastEpoch} from "./api";
import {ThePie} from "./ThePie";
import {TableCell} from "@mui/material";
import * as Plotly from "plotly.js";

function App() {
    const [epochs, setEpochs] = useState<Epoch[]>([]);
    const [data, setData] = useState<Plotly.Data[]>([]);

    const fetchEpochs = async () => {
        const lastEpoch = await getLastEpoch();
        const step = Math.floor(lastEpoch.epoch / 100);
        const promises: Promise<Epoch>[] = [];
        for (let mult = 0; mult <= 100; mult++) {
            const epochNumber = mult * step;
            promises.push(getClientAffinityEpoch(epochNumber));
        }
        const _epochs: Epoch[] = await Promise.all(promises);
        setEpochs(_epochs);
    };

    useState(() => {
        fetchEpochs().finally();
    });

    const mapEverything = () => {
        const clients = ['Uncertain',
            'Lighthouse',
            'Lodestar',
            'Nimbus',
            'Prysm',
            'Teku',
            'Other'];
        const data = [];
        data.push({
            x: epochs.map(epoch => epoch.epoch),
            y: epochs.map(epochs => epochs.clientAffinity.Prysm),
            mode: 'lines+markers',
        });
        console.log(data);
        setData(data);
    }

    useEffect(() => {
        if (epochs.length > 0) {
            mapEverything();
        }
    }, [epochs])

    return (
        <div className="App">
            <header className="App-header header">
                <h1>Clientversity</h1>
            </header>
            {epochs.length > 0 && <ThePie epoch={epochs[epochs.length - 1]}/>}
            {data.length > 0 && <Plot data={data} layout={{title: 'Line chart'}}/>}
            <TheTable epochs={epochs}/>
        </div>
    );
}

export default App;
