'use client';

import { BoltIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const navigation = [
    { name: 'Devices', href: '/', icon: BoltIcon },
    { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="flex h-full w-64 flex-col bg-gray-900">
            <div className="flex h-16 items-center px-6">
                <h1 className="text-xl font-bold text-white">EnergyHub</h1>
            </div>
            <nav className="flex-1 space-y-1 px-2 py-4">
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={clsx(
                                'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                                isActive
                                    ? 'bg-gray-800 text-white'
                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                            )}
                        >
                            <item.icon
                                className={clsx(
                                    'mr-3 h-6 w-6',
                                    isActive
                                        ? 'text-white'
                                        : 'text-gray-400 group-hover:text-gray-300'
                                )}
                            />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
} 