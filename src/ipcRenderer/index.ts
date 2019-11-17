import { ipcRenderer } from 'electron';
import { logger } from '@root/logger';
import { IpcInterface } from '../../enums/globalEnum';

export function openFile(callback: (e: Electron.IpcRendererEvent, result: boolean) => void) {
  ipcRenderer.send(IpcInterface.OPEN_FILE);
  ipcRenderer.once(IpcInterface.OPEN_FILE_RESPONSE, callback)
}

interface IFileObj {
  filePath: string;
}

export function getFilesList(callback: (e: Electron.IpcRendererEvent, fl: FilesList) => void) {
  logger.info('start get-fileslist');
  ipcRenderer.send(IpcInterface.GET_FILESLIST);
  ipcRenderer.once(IpcInterface.GET_FILESLIST_RESPONSE, callback);
}

export function addFileReloadInFileEditor(callback: (fileContent: string) => void) {
  ipcRenderer.on(IpcInterface.GET_FILE_RESPONSE, (event, fileContent: string) => {
    callback(fileContent);
  });
}

export function openFileEditor(filePath: string) {
  ipcRenderer.send(IpcInterface.OPEN_FILE_EDITOR, filePath);
}