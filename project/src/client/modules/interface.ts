import { MathUtils } from "@shared/math";

const AddPeekEntryByModel = (pModels: string[], pData: any, pOptions: any) => {
    global.exports["srp-interact"].AddPeekEntryByModel(pModels, pData, pOptions);
};

const AddPeekEntryByPolyTarget = (pEvent: string, pData: any, pOptions: any) => {
    global.exports["srp-interact"].AddPeekEntryByPolyTarget(pEvent, pData, pOptions);
};

const AddPeekEntryByFlag = (pFlags: any, pData: any, pOptions: any) => {
    global.exports["srp-interact"].AddPeekEntryByFlag(pFlags, pData, pOptions);
};

const AddPeekEntryByType = (pType: number | number[], pData: any, pOptions: any) => {
    global.exports["srp-interact"].AddPeekEntryByEntityType(pType, pData, pOptions);
};

const AddInteraction = (id: string, coords: Vector3Type, options: any, context: any) => {
    const data = {
        id,
        coords: [coords.x, coords.y, coords.z],
        options,
        context
    };
    global.exports["interactions"].AddInteraction(data);
};

const AddInteractionByModel = (id: string, models: string[], options: any, context: any) => {
    const data = {
        id,
        options,
        context
    };
    global.exports["interactions"].AddInteractionByModel(models, data);
};

const AddPlayerInteraction = (id: string, options: any, context: any) => {
    const data = {
        id,
        options,
        context
    };
    data.context.isPlayer = true;
    global.exports["interactions"].AddPedInteraction(data);
};

const AddPedInteraction = (id: string, options: any, context: any) => {
    const data = {
        id,
        options,
        context
    };
    global.exports["interactions"].AddPedInteraction(data);
};

const AddVehicleInteraction = (id: string, options: any, context: any) => {
    const data = {
        id,
        options,
        context
    };
    global.exports["interactions"].AddVehicleInteraction(data);
};

const RemoveInteraction = (id: string) => {
    global.exports["interactions"].RemoveInteraction(id);
};

const RemoveVehicleInteraction = (id: string) => {
    global.exports["interactions"].RemoveVehicleInteraction(id);
};

const RemovePedInteraction = (id: string) => {
    global.exports["interactions"].RemovePedInteraction(id);
};

const Taskbar = (pLength: number, pName: string, pRunCheck = false, pDistCheck = null, pKeepWeapon = true, pVehicle = null) => {
    return new Promise((resolve) => {
        global.exports["srp-taskbar"].taskBar(
            pLength,
            pName,
            pRunCheck,
            pKeepWeapon,
            pVehicle,
            false,
            resolve,
            // pDistCheck == null ? void 0 : pDistCheck.distance,
            // pDistCheck == null ? void 0 : pDistCheck.entity
        );
    });
};

const DoPhoneConfirmation = (pTitle: string, pText: string, pIcon: string, pTimeout: number) => {
    return new Promise((resolve) => {
        global.exports["cool-phone"].DoPhoneConfirmation(pTitle, pText, pIcon, resolve, pTimeout);
    });
};

const DoPhoneNotification = (pTitle: string, pBody: string, pForced = true, pApp = "home-screen") => {
    global.exports["cool-ui"].SendUIMessage({
        source: "cool-nui",
        app: "phone",
        data: {
            action: "notification",
            target_app: pApp,
            title: pTitle,
            body: pBody,
            show_even_if_app_active: pForced
        }
    });
};

const DrawTextJS = (x: number, y: number, text: string, color: number[], scale: number, font: number, justification = 0, outline = true) => {
    SetTextColour(color[0], color[1], color[2], color[3]);
    if (outline) {
        SetTextOutline();
    }
    SetTextScale(0, scale);
    SetTextFont(font != null ? font : 0);
    SetTextJustification(justification);
    if (justification === 2) SetTextWrap(0, 0.575);
    SetTextEntry("STRING");
    AddTextComponentString(text != null ? text : "Dummy text");
    EndTextCommandDisplayText(x, y);
};

const DrawTextBox = (coords: Vector3Type, distance: number, text: string, color: number[], font = 4, outline = true, background: any) => {
    SetDrawOrigin(coords.x, coords.y, coords.z, 0);
    const scale = Math.max(MathUtils.getMapRange([0, 10], [0.4, 0.25], distance), 0.1);
    DrawTextJS(0, 0, text, color, scale, font, 0, outline);
    if (background) {
        DrawRect(
            2e-3,
            background.height / 2,
            background.width,
            background.height,
            background.color[0],
            background.color[1],
            background.color[2],
            background.color[3]
        );
    }
    ClearDrawOrigin();
};

export const Interface = {
    addPeekEntryByModel: AddPeekEntryByModel,
    addPeekEntryByTarget: AddPeekEntryByPolyTarget,
    addPeekEntryByFlag: AddPeekEntryByFlag,
    addPeekEntryByType: AddPeekEntryByType,
    addInteraction: AddInteraction,
    addInteractionByModel: AddInteractionByModel,
    addPlayerInteraction: AddPlayerInteraction,
    addPedInteraction: AddPedInteraction,
    addVehicleInteraction: AddVehicleInteraction,
    removeInteraction: RemoveInteraction,
    removePlayerInteraction: RemovePedInteraction,
    removePedInteraction: RemovePedInteraction,
    removeVehicleInteraction: RemoveVehicleInteraction,
    taskBar: Taskbar,
    phoneConfirmation: DoPhoneConfirmation,
    phoneNotification: DoPhoneNotification,
    drawText: DrawTextJS,
    drawText3D: DrawTextBox
};