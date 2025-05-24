export interface ShellyDevice {
    id: string;
    name: string;
    address: string;
    type: 'PLUG' | 'OTHER';
}

export interface SwitchStatus {
    output: boolean;
    power: number;
    overpower: boolean;
    temperature: number;
}