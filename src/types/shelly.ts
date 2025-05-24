export interface ShellyDevice {
    id: string;
    name: string;
    address: string;
    type: 'PLUG' | 'OTHER';
    contractAddress: string;
    chargedAmount?: number; // in USDC
}

export interface SwitchStatus {
    output: boolean;
    power: number;
    overpower: boolean;
    temperature: number;
}

export interface MetricPoint {
    timestamp: Date;
    power: number;
    temperature: number;
}