
export function sciPrefix(seconds: number): string {
    if (seconds < 1e-6) {
        return `${(seconds * 1e9).toFixed(0)}n`;
    }
    if (seconds < 1e-3) {
        return `${(seconds * 1e6).toFixed(0)}µ`;
    }
    if (seconds < 1) {
        return `${(seconds * 1e3).toFixed(0)}m`;
    }
    return seconds.toPrecision(2);
}
