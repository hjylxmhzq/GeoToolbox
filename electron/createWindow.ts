import { BrowserWindow } from 'electron';

function createWindow(windowName: string, url: string, path: string) {
    // 创建浏览器窗口。
    let wins = globalThis.wins;
    wins[windowName] = new BrowserWindow({
        width: 800,
        height: 600,
        minHeight: 400,
        minWidth: 650,
        webPreferences: {
            nodeIntegration: true
        }
    })

    // 加载index.html文件
    if (process.env.NODE_ENV.includes('dev')) {
        wins[windowName].loadURL(url);
    } else {
        wins[windowName].loadFile(path);
    }
    // 当 window 被关闭，这个事件会被触发。
    wins[windowName].on('closed', () => {
        // 取消引用 window 对象，如果你的应用支持多窗口的话，
        // 通常会把多个 window 对象存放在一个数组里面，
        // 与此同时，你应该删除相应的元素。
        wins[windowName] = null
    })
    return wins[windowName];
}

export default createWindow;