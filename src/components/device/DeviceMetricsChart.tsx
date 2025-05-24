'use client';

import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface MetricPoint {
    timestamp: Date;
    power: number;
    temperature: number;
}

interface DeviceMetricsChartProps {
    data: MetricPoint[];
}

export function DeviceMetricsChart({ data }: DeviceMetricsChartProps) {
    const chartData = {
        labels: data.map(point => 
            new Date(point.timestamp).toLocaleTimeString()
        ),
        datasets: [
            {
                label: 'Power (W)',
                data: data.map(point => point.power),
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.5)',
                yAxisID: 'y',
            },
            {
                label: 'Temperature (°C)',
                data: data.map(point => point.temperature),
                borderColor: 'rgb(239, 68, 68)',
                backgroundColor: 'rgba(239, 68, 68, 0.5)',
                yAxisID: 'y1',
            },
        ],
    };

    const options = {
        responsive: true,
        interaction: {
            mode: 'index' as const,
            intersect: false,
        },
        scales: {
            y: {
                type: 'linear' as const,
                display: true,
                position: 'left' as const,
                title: {
                    display: true,
                    text: 'Power (W)'
                }
            },
            y1: {
                type: 'linear' as const,
                display: true,
                position: 'right' as const,
                title: {
                    display: true,
                    text: 'Temperature (°C)'
                },
                grid: {
                    drawOnChartArea: false,
                },
            },
        },
    };

    return (
        <div className="bg-white rounded-lg shadow p-4">
            <Line options={options} data={chartData} />
        </div>
    );
} 