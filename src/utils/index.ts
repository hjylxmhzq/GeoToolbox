export function throttle(fn: (...args: any[]) => any, delay: number, last: boolean) {
    let sleeping = false;
    let lastExe: number | null = null;
    return function (...args: any) {
        if (!sleeping) {
            sleeping = true;
            clearTimeout(lastExe);
            fn(...args);
            window.setTimeout(function () {
                sleeping = false;
            }, delay)
        } 
        else if (last) {
            clearTimeout(lastExe);
            lastExe = window.setTimeout(function () {
                fn(...args);
            }, delay);
        }
    }
}
