import ipcHandlers from './ipcHandler';

function addIpcListeners(ipcMain) {
  for (let ipcHandler of ipcHandlers) {
    ipcHandler(ipcMain);
  }
}

export default addIpcListeners;