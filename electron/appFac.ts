import createWindow from './createWindow';

function appFac(app: Electron.App) {

    app.on('ready', createWindow.bind(this, 'main', 'http://localhost:8080/index.html', '../dist/index.html'));

    // 当全部窗口关闭时退出。
    app.on('window-all-closed', () => {
        // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
        // 否则绝大部分应用及其菜单栏会保持激活。
        if (process.platform !== 'darwin') {
            app.quit();
        }
    })

    app.on('activate', () => {
        if (globalThis.wins.main === null) {
            createWindow('main', 'http://localhost:8080/index.html', '../dist/index.html');
        }
    })
}

export default appFac;