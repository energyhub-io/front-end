'use client';

import { AddDeviceForm } from '@/components/AddDeviceForm';
import { DeviceList } from '@/components/DeviceList';

export default function Home() {
    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Shelly Devices</h1>
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Add New Device</h2>
                <AddDeviceForm onDeviceAdded={() => {
                    // This will trigger a client-side refresh
                    window.location.reload();
                }} />
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-4">Your Devices</h2>
                <DeviceList />
            </div>
        </main>
    );
}
