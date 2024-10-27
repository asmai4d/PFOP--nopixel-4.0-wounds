import { InitEvents } from "./events";

on("onResourceStart", async (resourceName: string) => {
    if (resourceName !== GetCurrentResourceName()) return;

    InitEvents();
});