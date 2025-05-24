# EnergyHub - Decentralized Energy Sharing Platform

> 🏆 Built during ETHBratislava 2025 Hackathon

A decentralized platform that revolutionizes how we share, monetize, and donate energy using smart contracts and IoT devices. EnergyHub connects energy producers directly with consumers and beneficiaries, fostering a more sustainable and equitable energy ecosystem.

## 🌟 Vision & Impact

### 🌱 Empowering Local Green Energy Champions

Our smart contract enables independent producers (homes with solar panels, community wind projects) to monetize surplus renewable energy directly. This creates new income streams while incentivizing decentralized, clean energy production at the grassroots level.

### 🤝 Direct & Transparent Energy Philanthropy

We provide a clear, auditable pathway for energy donations. Smart plugs activate automatically for beneficiaries, ensuring donations translate directly into tangible power access for lighting, heating, or charging devices.

### ♻️ Reducing Energy Waste

By creating a direct market and donation channel for surplus energy, our system ensures locally generated renewable power isn't wasted. It connects supply directly with demand, maximizing the environmental impact of every kilowatt produced.

### 🏘️ Building Resilient Communities

Our technology fosters P2P (peer-to-peer or philanthropist-to-beneficiary) energy sharing, strengthening community ties and promoting energy independence from large utilities.

## ✨ Features

- 🔌 Real-time device monitoring
- ⚡ Power consumption tracking
- 🌡️ Temperature monitoring
- 🎮 Smart contract integration
- 💰 Direct monetization of surplus energy
- 🤝 Energy donation capabilities
- 📊 Usage analytics and reporting
- 🔄 Automatic status updates
- 📱 Responsive design

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Blockchain**: Ethereum Smart Contracts
- **IoT**: Shelly Smart Plugs
- **Charts**: Chart.js
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

## Smart Contracts

Our platform uses two main smart contracts for energy management:

```
Producer Contract: 0x40B1E4993f69256D9d629C1846E7859a4Bb1c64B
Consumer Contract: 0x60a863a9286fdd5a070865d620930084b04c8afb
```

## Similar Projects

Worth checking out [Combinder](https://www.combinder.io/) - another innovative project in the DePIN (Decentralized Physical Infrastructure Network) space focusing on household device energy management.

## Contributing

We welcome contributions that help make energy sharing more accessible and efficient! See our contributing guidelines for more details.

## License

MIT License - see LICENSE file for details
