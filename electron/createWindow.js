const { BrowserWindow } = require('electron');

function createWindow() {
    // 创建浏览器窗口。
    let wins = global.wins;
    wins.main = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    // 加载index.html文件
    if (process.env.NODE_ENV.includes('dev')) {
        wins.main.loadURL('http://localhost:8080/index.html');
    } else {
        wins.main.loadFile('../dist/index.html');
    }
    // 当 window 被关闭，这个事件会被触发。
    wins.main.on('closed', () => {
        // 取消引用 window 对象，如果你的应用支持多窗口的话，
        // 通常会把多个 window 对象存放在一个数组里面，
        // 与此同时，你应该删除相应的元素。
        wins.main = null
    })
}

module.exports = createWindow;