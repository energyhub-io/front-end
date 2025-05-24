'use client';

import { useState } from 'react';
import { shellyApi } from '@/lib/api';

interface AddDeviceFormProps {
    onDeviceAdded: () => void;
}

export function AddDeviceForm({ onDeviceAdded }: AddDeviceFormProps) {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [type, setType] = useState<'PLUG' | 'OTHER'>('PLUG');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await shellyApi.addDevice({
                name,
                address,
                type,
                contractAddress: "0x70F657164e5b75689b64B7fd1fA275F334f28e18", // Default contract address
                chargedAmount: 0
            });
            setName('');
            setAddress('');
            setType('PLUG');
            onDeviceAdded();
        } catch (error) {
            console.error('Failed to add device:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
            <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="http://192.168.1.100"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value as 'PLUG' | 'OTHER')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                    <option value="PLUG">Plug</option>
                    <option value="OTHER">Other</option>
                </select>
            </div>
            <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
                {loading ? 'Adding...' : 'Add Device'}
            </button>
        </form>
    );
} 