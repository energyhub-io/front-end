import axios from 'axios';
import { ShellyDevice, SwitchStatus } from '@/types/shelly';
import { handleApiError } from './api-error';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const shellyApi = {
    getDevices: async () => {
        try {
            const { data } = await axios.get<ShellyDevice[]>(`${API_URL}/shelly/devices`);
            return data;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    addDevice: async (device: Omit<ShellyDevice, 'id'>) => {
        try {
            const { data } = await axios.post<ShellyDevice>(`${API_URL}/shelly/devices`, device);
            return data;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    getStatus: async (id: string) => {
        try {
            const { data } = await axios.get<SwitchStatus>(`${API_URL}/shelly/devices/${id}/status`);
            return data;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    setState: async (id: string, state: boolean) => {
        try {
            await axios.put(`${API_URL}/shelly/devices/${id}/state`, { state });
        } catch (error) {
            throw handleApiError(error);
        }
    },

    deleteDevice: async (id: string) => {
        try {
            await axios.delete(`${API_URL}/shelly/devices/${id}`);
        } catch (error) {
            throw handleApiError(error);
        }
    },
}; 