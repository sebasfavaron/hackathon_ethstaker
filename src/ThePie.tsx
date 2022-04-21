import React, {FC} from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {Epoch} from "./types";
import Plot from "react-plotly.js";

type ThePieProps = {
    epoch: Epoch;
}

export const ThePie: FC<ThePieProps> = ({epoch}) => {
    return  <Plot data={[
        {
            values: [epoch.clientAffinity.Uncertain, epoch.clientAffinity.Lighthouse, epoch.clientAffinity.Lodestar, epoch.clientAffinity.Nimbus,
                epoch.clientAffinity.Prysm,epoch.clientAffinity.Teku,epoch.clientAffinity.Other],
            labels: ["Uncertain", "Lighthouse", "Lodestar", "Nimbus", "Prysm", "Teku", "Other"],
            type: "pie",
        },
    ]} layout={{height: 400, width: 500, title: '🥧 Pie chart'}} />
}