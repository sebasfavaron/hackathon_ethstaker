import {FC} from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {Epoch} from "./types";

type TheTableProps = {
    epochs: Epoch[];
}

export const TheTable: FC<TheTableProps> = ({epochs}) => {
    return <>
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell># Epoch</TableCell>
                        <TableCell align="right">Uncertain</TableCell>
                        <TableCell align="right">Lighthouse</TableCell>
                        <TableCell align="right">Lodestar</TableCell>
                        <TableCell align="right">Nimbus</TableCell>
                        <TableCell align="right">Prysm</TableCell>
                        <TableCell align="right">Teku</TableCell>
                        <TableCell align="right">Other</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {epochs.map((epoch) => (
                        <TableRow
                            key={epoch.epoch}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">
                                {epoch.epoch}
                            </TableCell>
                            <TableCell align="right">{epoch.clientAffinity.Uncertain}</TableCell>
                            <TableCell align="right">{epoch.clientAffinity.Lighthouse}</TableCell>
                            <TableCell align="right">{epoch.clientAffinity.Lodestar}</TableCell>
                            <TableCell align="right">{epoch.clientAffinity.Nimbus}</TableCell>
                            <TableCell align="right">{epoch.clientAffinity.Prysm}</TableCell>
                            <TableCell align="right">{epoch.clientAffinity.Teku}</TableCell>
                            <TableCell align="right">{epoch.clientAffinity.Other}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer></>
}