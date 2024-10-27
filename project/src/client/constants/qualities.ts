export const qualities = {
    poor: 1,
    medium: 1.25,
    high: 1.5
} as { [key: string]: number };

export function getQualityValueByString(quality: string) {
    return qualities[quality] || 1;
}