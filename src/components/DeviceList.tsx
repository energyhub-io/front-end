'use client';

import { useEffect, useState } from 'react';
import { ShellyDevice, SwitchStatus } from '@/types/shelly';
import { shellyApi } from '@/lib/api';
import { PowerIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

export function DeviceList() {
    const [devices, setDevices] = useState<ShellyDevice[]>([]);
    const [statuses, setStatuses] = useState<Record<string, SwitchStatus>>({});
    const [loading, setLoading] = useState(true);

    const updateDeviceStatuses = async (devices: ShellyDevice[]) => {
        const statusMap: Record<string, SwitchStatus> = {};
        await Promise.all(
            devices.map(async (device) => {
                try {
                    statusMap[device.id] = await shellyApi.getStatus(device.id);
                } catch (error) {
                    console.error(`Failed to load status for ${device.id}:`, error);
                }
            })
        );
        setStatuses(statusMap);
    };

    const loadDevices = async () => {
        try {
            const devices = await shellyApi.getDevices();
            setDevices(devices);
            await updateDeviceStatuses(devices);
        } catch (error) {
            console.error('Failed to load devices:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDevices();
        // Set up periodic status updates
        const intervalId = setInterval(() => {
            if (devices.length > 0) {
                updateDeviceStatuses(devices);
            }
        }, 5000); // Update every 5 seconds

        return () => clearInterval(intervalId);
    }, [devices]);

    const toggleDevice = async (id: string) => {
        const currentStatus = statuses[id];
        if (!currentStatus) return;

        try {
            await shellyApi.setState(id, !currentStatus.output);
            // Immediately update local state
            setStatuses(prev => ({
                ...prev,
                [id]: { ...currentStatus, output: !currentStatus.output }
            }));
            // Fetch actual status after a short delay
            setTimeout(async () => {
                try {
                    const newStatus = await shellyApi.getStatus(id);
                    setStatuses(prev => ({ ...prev, [id]: newStatus }));
                } catch (error) {
                    console.error('Failed to update status:', error);
                }
            }, 1000);
        } catch (error) {
            console.error('Failed to toggle device:', error);
        }
    };

    const formatNumber = (value: number | string | undefined): string => {
        if (typeof value === 'undefined') return 'N/A';
        const num = typeof value === 'string' ? parseFloat(value) : value;
        return isNaN(num) ? 'N/A' : num.toFixed(1);
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {devices.map(device => {
                const status = statuses[device.id];

                return (
                    <Link
                        href={`/devices/${device.id}`}
                        key={device.id}
                        className="block p-4 border rounded-lg shadow bg-white hover:shadow-lg transition-shadow"
                    >
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-gray-900">{device.name}</h3>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    toggleDevice(device.id);
                                }}
                                className={`p-2 rounded-full ${status?.output
                                    ? 'bg-green-500 text-white'
                                    : 'bg-gray-200 text-gray-600'
                                    }`}
                            >
                                <PowerIcon className="h-6 w-6" />
                            </button>
                        </div>
                        <p className="text-sm text-gray-600">{device.address}</p>
                        {status && (
                            <div className="mt-2 text-sm text-gray-700">
                                <p>Power: {formatNumber(status.power)}W</p>
                                <p>Temperature: {formatNumber(status.temperature)}°C</p>
                            </div>
                        )}
                    </Link>
                );
            })}
        </div>
    );
} 