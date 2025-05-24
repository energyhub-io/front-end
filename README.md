# EnergyHub - Smart Energy Management Platform

> 🏆 Built during ETHBratislava 2025 Hackathon

A modern web application for managing Shelly smart devices and monitoring energy consumption in real-time. The project aims to make energy consumption monitoring and smart device management more accessible and efficient.

## 🚀 Hackathon Project

This project was developed during ETHBratislava 2025, focusing on:

- Smart home energy management
- Real-time power consumption monitoring
- IoT device integration
- User-friendly interface for device control

## ✨ Features

- 🔌 Real-time device monitoring
- ⚡ Power consumption tracking
- 🌡️ Temperature monitoring
- 🎮 Device power state control
- 🔄 Automatic status updates (5s interval)
- 📱 Responsive design

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Icons**: Heroicons

## Getting Started

### Prerequisites

- Node.js 18+
- npm/yarn
- Running Shelly backend service

### Installation

1. Clone the repository

```bash
git clone https://github.com/energyhub-io/shelly-frontend.git
cd shelly-frontend
```

2. Install dependencies

```bash
npm install
```

3. Configure environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

4. Start the development server

```bash
npm run dev
```

Visit `http://localhost:3001` in your browser.

## API Integration

The frontend connects to a NestJS backend service that manages Shelly devices:

| Endpoint                      | Method | Description         |
| ----------------------------- | ------ | ------------------- |
| `/shelly/devices`             | GET    | List all devices    |
| `/shelly/devices`             | POST   | Add new device      |
| `/shelly/devices/{id}/status` | GET    | Get device status   |
| `/shelly/devices/{id}/state`  | PUT    | Toggle device state |
| `/shelly/devices/{id}`        | DELETE | Remove device       |

## Project Structure

```
src/
├── components/         # React components
│   ├── DeviceList.tsx # Main device management
│   └── AddDeviceForm.tsx
├── lib/               # Utilities and services
│   ├── api.ts        # API client
│   └── api-error.ts  # Error handling
├── types/             # TypeScript definitions
│   └── shelly.ts
└── app/              # Next.js app router pages
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see LICENSE file for details
