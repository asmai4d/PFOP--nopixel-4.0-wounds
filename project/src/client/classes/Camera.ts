export abstract class Camera {
    public static cam: number = 0;

    public static start(playerPed: number, isDead: boolean) {
        this.cam = CreateCam("DEFAULT_SCRIPTED_CAMERA", true);

        const plyCoords = GetEntityCoords(playerPed, false);
        const plyHeading = GetEntityHeading(playerPed);

        if (isDead) {
            const offset = GetObjectOffsetFromCoords(plyCoords[0], plyCoords[1], plyCoords[2], plyHeading, -0.2, 0.1, 1);

            SetCamCoord(this.cam, offset[0], offset[1], offset[2]);
            SetCamRot(this.cam, -90, 0, plyHeading - 177.5, 2);
        } else {
            const offset = GetObjectOffsetFromCoords(plyCoords[0], plyCoords[1], plyCoords[2], plyHeading, -0.4, 2, 0);

            SetCamCoord(this.cam, offset[0], offset[1], offset[2]);
            SetCamRot(this.cam, 0, 0, plyHeading - 180, 2);
        }

        RenderScriptCams(true, true, 750, true, false);
        SetCamFov(this.cam, 60);
    }

    public static stop() {
        DestroyCam(this.cam, true);
        RenderScriptCams(false, true, 1000, true, false);
    }
}