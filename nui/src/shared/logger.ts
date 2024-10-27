const LOG_LEVELS = {
    warning: 1,
    log: 2,
    error: 3,
    debug: 4
} as { [key: string]: number };

const resourceLogLevel = typeof (window as any).GetConvar === "function" ? (window as any).GetConvar(`${(window as any).GetParentResourceName()}_logLevel`, "") : "";

let logLevel = typeof (window as any).GetConvar === "function" ? (window as any).GetConvar("sv_loglevel", "warning") : "debug"; // warning
logLevel = resourceLogLevel?.length > 0 ? resourceLogLevel : logLevel;

(() => {
    if (!LOG_LEVELS[logLevel]) {
        throw new Error(`Invalid log level: ${logLevel}`);
    }
})();

const warning = () => LOG_LEVELS[logLevel] >= LOG_LEVELS["warning"];
const log = () => LOG_LEVELS[logLevel] >= LOG_LEVELS["log"];
const error = () => LOG_LEVELS[logLevel] >= LOG_LEVELS["error"];
const debug = () => logLevel === "debug";

export const Logger = {
    warning: (text: string, ...input: any) => {
        if (!warning()) return;
        console.log(`^3[WARNING] ^7${text}`, ...input, "^0");
    },
    log: (text: string, ...input: any) => {
        if (!log()) return;
        console.log(`^5[cool] ^7${text}`, ...input, "^0");
    },
    debug: (text: string, ...input: any) => {
        if (!debug()) return;
        console.log(`^2[D] ${text}`, ...input, "^0");
    },
    error: (text: string, ...input: any) => {
        if (!error()) return;
        console.log(`^1[ERROR] ${text}`, ...input, "^0");
    }
};