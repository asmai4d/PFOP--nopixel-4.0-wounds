import { isEnvBrowser } from '../../utils/misc';

export const nuiAction = async <T = any>(callback: string, data?: any, returnData?: any): Promise<T> => {
    if (isEnvBrowser()) {
        const returnedData = {
            data: returnData?.returnData ?? {},
            meta: {
                ok: true,
                message: 'Success'
            }
        };

        return <any>returnedData;
    }

    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(Object.assign(data || {}, { character: {} || {} }))
    };

    const resourceName = (window as any).GetParentResourceName ? (window as any).GetParentResourceName() : 'nui-frame-app';

    let respFormatted = null;

    const returnedData = {
        data: returnData?.returnData ?? {},
        meta: {
            ok: true,
            message: 'Success'
        }
    };

    const resp = await fetch(`https://${resourceName}/${callback}`, options).then((resp) => resp.json()).catch((err) => {
        console.log(`[NUI COMMS] Error fetching data... setting mock data | Action: ${callback} | Error: ${err}`);
        respFormatted = returnedData;
    });

    if (resp && resp !== undefined && resp !== null) {
        //console.log(`[NUI COMMS] Successfully fetched data | Action: ${callback} | Data: ${JSON.stringify(resp)}`);
        respFormatted = resp;
    } else {
        console.log(`[NUI COMMS] Error fetching data... setting mock data | Action: ${callback} | Error: Response was null or undefined`);
        respFormatted = returnedData;
    }

    return respFormatted;
}