"use client";

import { useEffect, useState } from "react";
import { ShellyDevice, SwitchStatus } from "@/types/shelly";
import { shellyApi } from "@/lib/api";
import { PowerIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { ethers } from "ethers";
import abi from "./abi.json";
import erc20abi from "./erc20_abi.json";

export function DeviceList() {
  const [devices, setDevices] = useState<ShellyDevice[]>([]);
  const [statuses, setStatuses] = useState<Record<string, SwitchStatus>>({});
  const [loading, setLoading] = useState(true);

  const updateDeviceStatuses = async (devices: ShellyDevice[]) => {
    const statusMap: Record<string, SwitchStatus> = {};
    await Promise.all(
      devices.map(async (device) => {
        try {
          statusMap[device.id] = await shellyApi.getStatus(device.id);
        } catch (error) {
          console.error(`Failed to load status for ${device.id}:`, error);
        }
      })
    );
    setStatuses(statusMap);
  };

  const loadDevices = async () => {
    try {
      const devices = await shellyApi.getDevices();
      setDevices(devices);
      await updateDeviceStatuses(devices);
    } catch (error) {
      console.error("Failed to load devices:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDevices();
    // Set up periodic status updates
    const intervalId = setInterval(() => {
      if (devices.length > 0) {
        updateDeviceStatuses(devices);
      }
    }, 5000); // Update every 5 seconds

    return () => clearInterval(intervalId);
  }, [devices]);

  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [erc20contract, seterc20contract] = useState(null);
  useEffect(() => {
    const initializeProvider = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);

        const walletAddress = accounts[0]; // first account in MetaMask
        const signer = provider.getSigner(walletAddress);
        setSigner(signer);

        const contractAddress = "0x60a863a9286fdd5a070865d620930084b04c8afb";
        const contract = new ethers.Contract(contractAddress, abi, signer);
        setContract(contract);

        const erc20contractAddress =
          "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";
        const erc20 = new ethers.Contract(
          erc20contractAddress,
          erc20abi,
          signer
        );
        seterc20contract(erc20);

        const amount = ethers.utils.parseUnits("1000", 18); // Approving 1000 tokens, adjust as needed
        const tx = await erc20.approve(contractAddress, amount);
        await tx.wait();
      }
    };

    initializeProvider();
  }, []);

  const toggleDevice = async (id: string) => {
    // Do transaction and if it is successful enable the switch
    console.log(contract.getContractTokenBalance());
    contract.depositTokens(10);
    return;
    const currentStatus = statuses[id];
    if (!currentStatus) return;

    try {
      await shellyApi.setState(id, !currentStatus.output);
      // Immediately update local state
      setStatuses((prev) => ({
        ...prev,
        [id]: { ...currentStatus, output: !currentStatus.output },
      }));
      // Fetch actual status after a short delay
      setTimeout(async () => {
        try {
          const newStatus = await shellyApi.getStatus(id);
          setStatuses((prev) => ({ ...prev, [id]: newStatus }));
        } catch (error) {
          console.error("Failed to update status:", error);
        }
      }, 1000);
    } catch (error) {
      console.error("Failed to toggle device:", error);
    }
  };

  const formatNumber = (value: number | string | undefined): string => {
    if (typeof value === "undefined") return "N/A";
    const num = typeof value === "string" ? parseFloat(value) : value;
    return isNaN(num) ? "N/A" : num.toFixed(1);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {devices.map((device) => {
        const status = statuses[device.id];

        return (
          <Link
            href={`/devices/${device.id}`}
            key={device.id}
            className="block p-4 border rounded-lg shadow bg-white hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">
                {device.name}
              </h3>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleDevice(device.id);
                }}
                className={`p-2 rounded-full ${
                  status?.output
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                <PowerIcon className="h-6 w-6" />
              </button>
            </div>
            <p className="text-sm text-gray-600">{device.address}</p>
            {status && (
              <div className="mt-2 text-sm text-gray-700">
                <p>Power: {formatNumber(status.power)}W</p>
                <p>Temperature: {formatNumber(status.temperature)}°C</p>
              </div>
            )}
          </Link>
        );
      })}
    </div>
  );
}
