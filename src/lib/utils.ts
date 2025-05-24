/**
 * Shortens an Ethereum address to a more readable format
 * @param address The full Ethereum address
 * @returns Shortened address in format "0x1234...5678"
 */
export const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
}; 