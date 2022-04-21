export type ClientAffinity = {
    "Uncertain": number;
    "Lighthouse": number;
    "Lodestar": number;
    "Nimbus": number;
    "Other": number;
    "Prysm": number; 
    "Teku": number;
};

export type Epoch = {
    epoch: number;
    clientAffinity: ClientAffinity;
}