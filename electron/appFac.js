const createWindow = require('./createWindow');

function appFac(app) {

    app.on('ready', createWindow);

    // 当全部窗口关闭时退出。
    app.on('window-all-closed', () => {
        // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
        // 否则绝大部分应用及其菜单栏会保持激活。
        if (process.platform !== 'darwin') {
            app.quit();
        }
    })

    app.on('activate', () => {
        if (global.wins.main === null) {
            createWindow();
        }
    })
}

module.exports = appFac;