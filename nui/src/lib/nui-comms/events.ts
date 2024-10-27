export const nuiEvent = (name: string, func: Function) => {
    window.addEventListener("message", ({ data }) => {
        const { event, args } = data;
        if (event == name) {
            func(...args);
        }
    });
}