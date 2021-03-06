import axios from "axios";
import {ClientAffinity, Epoch} from "./types";

const BLOCKPRINT_API = 'http://localhost:4000';
const BEACONCHAIN_API = 'http://localhost:4000/api/v1';

async function getClientAffinityLastSlot(): Promise<number> {
    const res = await axios.get(BLOCKPRINT_API + '/sync/status',
        {headers: {accept: 'application/json'}});
    if (res.status !== 200) {
        throw new Error(`Error response code ${res.status} ${res.statusText}`);
    }
    if (!(res.data && res.data.greatest_block_slot)) {
        throw new Error("Error no data");
    }
    return res.data.greatest_block_slot;
}

async function fetchEpochBySlot(slotId: number): Promise<number> {
    const res = await axios.get(BEACONCHAIN_API + '/block/' + slotId,
        {headers: {accept: 'application/json'}});
    if (res.status !== 200) {
        throw new Error(`Error response code ${res.status} ${res.statusText}`);
    }
    console.log(res.data)
    if (!(res.data && res.data.data && res.data.data.epoch)) {
        throw new Error("Error no data");
    }
    return res.data.data.epoch;
}

async function fetchClientAffinityByEpoch(startEpoch: number, endEpoch?: number): Promise<ClientAffinity> {
    let path = `/blocks_per_client/${startEpoch}`;
    if (endEpoch) {
        path = `/blocks_per_client/${startEpoch}/${endEpoch}`
    }
    const res = await axios.get(BLOCKPRINT_API + path);
    if (res.status !== 200) {
        throw new Error(`Error response code ${res.status} ${res.statusText}`);
    }
    if (!(res.data)) {
        throw new Error("Error no data");
    }
    return res.data;
}

export async function getLastEpochNumber(): Promise<number> {
    const lastSyncSlot: number = await getClientAffinityLastSlot();
    return await fetchEpochBySlot(lastSyncSlot);
}

export async function getClientAffinityEpoch(epochNumber: number): Promise<Epoch>{
    const affinity = await fetchClientAffinityByEpoch(epochNumber);
    return {epoch: epochNumber, clientAffinity: affinity};
}

export async function getLastEpoch(): Promise<Epoch> {
    const epochNumber = await getLastEpochNumber();
    return getClientAffinityEpoch(epochNumber);
}