import axios from "axios";
import {ClientAffinity} from "./types";

const BLOCKPRINT_API = 'https://api.blockprint.sigp.io';
const BEACONCHAIN_API = 'https://beaconcha.in/api/v1';

async function getClientAffinityLastSlot(): Promise<number>{
    const res = await axios.get(BLOCKPRINT_API+'/sync/status');
    if(res.status !== 200){
        throw new Error(`Error response code ${res.status} ${res.statusText}`);
    }
    if(!(res.data && res.data.greatest_block_slot)){
        throw new Error("Error no data");
    }
    return res.data.greatest_block_slot;
}

async function getEpochBySlot(slotId: number): Promise<number>{
    const res = await axios.get(BEACONCHAIN_API+'/block/');
    if(res.status !== 200){
        throw new Error(`Error response code ${res.status} ${res.statusText}`);
    }
    if(!(res.data && res.data.epoch)){
        throw new Error("Error no data");
    }
    return res.data.epoch;
}

export async function getClientAffinityByEpoch(startEpoch: number, endEpoch?: number): Promise<ClientAffinity> {
    let path = `/blocks_per_client/${startEpoch}`;
    if(endEpoch){
        path = `/blocks_per_client/${startEpoch}/${endEpoch}`
    }
    const res = await axios.get(BLOCKPRINT_API+'/block/');
    if(res.status !== 200){
        throw new Error(`Error response code ${res.status} ${res.statusText}`);
    }
    if(!(res.data)){
        throw new Error("Error no data");
    }
    return res.data;
}

export async function getLastEpochClientAffinity(): Promise<ClientAffinity>{
    const lastSyncSlot: number = await getClientAffinityLastSlot();
    const lastSyncEpoch: number = await getEpochBySlot(lastSyncSlot);
    return await getClientAffinityByEpoch(lastSyncEpoch);
}