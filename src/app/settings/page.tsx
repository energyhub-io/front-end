export default function SettingsPage() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Settings</h1>
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">API Configuration</h2>
                <p className="text-gray-600">
                    Current API URL: {process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}
                </p>
            </div>
        </div>
    );
} 