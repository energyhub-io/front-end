'use client';

import { AddDeviceForm } from "@/components/AddDeviceForm";
import { DeviceList } from "@/components/DeviceList";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export default function DevicesPage() {
    const [showAddForm, setShowAddForm] = useState(false);

    return (
        <div className="relative min-h-full">
            <h1 className="text-2xl font-bold mb-6 text-gray-900">Devices</h1>

            {showAddForm ? (
                <div className="mb-8 bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-900">Add New Device</h2>
                        <button
                            onClick={() => setShowAddForm(false)}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>
                    </div>
                    <AddDeviceForm onDeviceAdded={() => {
                        window.location.reload();
                        setShowAddForm(false);
                    }} />
                </div>
            ) : (
                <button
                    onClick={() => setShowAddForm(true)}
                    className="fixed bottom-8 right-8 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-colors"
                >
                    <PlusIcon className="h-6 w-6" />
                </button>
            )}

            <div>
                <DeviceList />
            </div>
        </div>
    );
} 