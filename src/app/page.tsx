'use client';

import { DeviceList } from "@/components/DeviceList";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { AddDeviceForm } from "@/components/AddDeviceForm";
import Image from 'next/image';
import Link from 'next/link';
import { QrCodeIcon, LockClosedIcon, ChartBarIcon, BoltIcon } from "@heroicons/react/24/outline";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="relative z-10 pb-8 bg-gray-50 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                        <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                            <div className="sm:text-center lg:text-left">
                                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                                    <span className="block">Pay-as-you-go</span>
                                    <span className="block text-blue-600">Smart Power Access</span>
                                </h1>
                                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                    Revolutionizing power access with blockchain technology. 
                                    Scan, pay, and plug in - it's that simple. Perfect for EV charging, 
                                    coworking spaces, and public venues.
                                </p>
                                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                    <div className="rounded-md shadow">
                                        <Link
                                            href="/devices"
                                            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                                        >
                                            Go to Dashboard
                                        </Link>
                                    </div>
                                    <div className="mt-3 sm:mt-0 sm:ml-3">
                                        <a
                                            href="#features"
                                            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10"
                                        >
                                            Learn More
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
                <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                    <Image
                        src="/hero.png"
                        alt="EnergyHub Hero"
                        width={1000}
                        height={800}
                        className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
                    />
                </div>
            </div>

            {/* Features Section */}
            <div id="features" className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:text-center">
                        <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            Smart Power Management
                        </p>
                    </div>

                    <div className="mt-10">
                        <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                            {features.map((feature) => (
                                <div key={feature.name} className="relative">
                                    <dt>
                                        <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                                            <feature.icon className="h-6 w-6" aria-hidden="true" />
                                        </div>
                                        <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                                    </dt>
                                    <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const features = [
    {
        name: 'Instant Access',
        description: 'Scan QR code and get immediate access to power after payment.',
        icon: QrCodeIcon,
    },
    {
        name: 'Secure Payments',
        description: 'Pay with USDC through secure smart contracts.',
        icon: LockClosedIcon,
    },
    {
        name: 'Usage Tracking',
        description: 'Monitor power consumption and costs in real-time.',
        icon: ChartBarIcon,
    },
    {
        name: 'Automated Control',
        description: 'Smart plugs automatically manage access based on payments.',
        icon: BoltIcon,
    },
];
