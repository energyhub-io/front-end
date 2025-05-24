'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ShellyDevice, SwitchStatus, MetricPoint } from '@/types/shelly';
import { shellyApi } from '@/lib/api';
import { PowerIcon, ArrowLeftIcon } from '@heroicons/react/24/solid';
import { DeviceMetricsChart } from '@/components/device/DeviceMetricsChart';
import { shortenAddress } from '@/lib/utils';

export default function DeviceDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [device, setDevice] = useState<ShellyDevice | null>(null);
    const [status, setStatus] = useState<SwitchStatus | null>(null);
    const [loading, setLoading] = useState(true);
    const [metrics, setMetrics] = useState<MetricPoint[]>([]);

    useEffect(() => {
        const loadDevice = async () => {
            try {
                const devices = await shellyApi.getDevices();
                const device = devices.find(d => d.id === params.id);
                if (device) {
                    setDevice(device);
                    const status = await shellyApi.getStatus(device.id);
                    setStatus(status);
                }
            } catch (error) {
                console.error('Failed to load device:', error);
            } finally {
                setLoading(false);
            }
        };

        loadDevice();
        const intervalId = setInterval(async () => {
            if (device) {
                try {
                    const status = await shellyApi.getStatus(device.id);
                    setStatus(status);
                } catch (error) {
                    console.error('Failed to update status:', error);
                }
            }
        }, 5000);

        return () => clearInterval(intervalId);
    }, [params.id, device]);

    useEffect(() => {
        if (!device) return;

        // Add new data point every 5 seconds
        const addMetricPoint = (status: SwitchStatus) => {
            setMetrics(prev => {
                const newPoint = {
                    timestamp: new Date(),
                    power: parseFloat(status.power?.toString() || '0'),
                    temperature: parseFloat(status.temperature?.toString() || '0'),
                };
                
                // Keep last hour of data (720 points at 5-second intervals)
                const newMetrics = [...prev, newPoint].slice(-720);
                return newMetrics;
            });
        };

        // Add initial point
        if (status) {
            addMetricPoint(status);
        }

        // Set up periodic updates
        const intervalId = setInterval(() => {
            if (status) {
                addMetricPoint(status);
            }
        }, 5000);

        return () => clearInterval(intervalId);
    }, [device, status]);

    const toggleDevice = async () => {
        if (!device || !status) return;

        try {
            await shellyApi.setState(device.id, !status.output);
            setStatus(prev => prev ? { ...prev, output: !prev.output } : null);
            // Fetch actual status after a short delay
            setTimeout(async () => {
                const newStatus = await shellyApi.getStatus(device.id);
                setStatus(newStatus);
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
    if (!device) return <div>Device not found</div>;

    return (
        <div>
            <div className="flex items-center mb-6">
                <button 
                    onClick={() => router.back()}
                    className="mr-4 p-2 rounded-full hover:bg-gray-200"
                >
                    <ArrowLeftIcon className="h-6 w-6" />
                </button>
                <h1 className="text-2xl font-bold text-gray-900">{device.name}</h1>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <p className="text-sm text-gray-600">IP Address</p>
                        <p className="text-lg font-medium text-gray-900">{device.address}</p>
                    </div>
                    <button
                        onClick={toggleDevice}
                        className={`p-4 rounded-full ${
                            status?.output 
                                ? 'bg-green-500 text-white' 
                                : 'bg-gray-200 text-gray-600'
                        }`}
                    >
                        <PowerIcon className="h-8 w-8" />
                    </button>
                </div>

                {status && (
                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-sm text-gray-600">Power Consumption</p>
                            <p className="text-2xl font-semibold text-gray-900">
                                {formatNumber(status.power)}W
                            </p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-sm text-gray-600">Temperature</p>
                            <p className="text-2xl font-semibold text-gray-900">
                                {formatNumber(status.temperature)}°C
                            </p>
                        </div>
                    </div>
                )}

                {status && device.contractAddress && (
                    <>
                        <div className="mt-6 grid grid-cols-2 gap-6">
                            <div className="bg-gray-50 rounded-lg p-4">
                                <p className="text-sm text-gray-600">Smart Contract</p>
                                <p className="text-lg font-medium text-gray-900 font-mono">
                                    {shortenAddress(device.contractAddress)}
                                </p>
                                <a 
                                    href={`https://etherscan.io/address/${device.contractAddress}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-blue-600 hover:text-blue-800"
                                >
                                    View on Etherscan
                                </a>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-4">
                                <p className="text-sm text-gray-600">Total Charged</p>
                                <p className="text-2xl font-semibold text-gray-900">
                                    {device.chargedAmount?.toFixed(2) || '0.00'} USDC
                                </p>
                            </div>
                        </div>
                    </>
                )}

                {/* Replace the placeholder with actual chart */}
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4 text-gray-900">Energy Consumption History</h2>
                    <DeviceMetricsChart data={metrics} />
                </div>
            </div>
        </div>
    );
} 