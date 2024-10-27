import { Sockets } from ".";
import { NUI } from "../nui/index";

NUI.register("__cpx_sdk:sockets:register", async (event: string) => {
    Sockets.register(event, (data: any) => NUI.execute(`__npx_sdk:sockets:pipe:${event}`, data));
});

NUI.register("__cpx_sdk:sockets:execute", async (event: string, data: any) => {
    return Sockets.execute(event, data);
});