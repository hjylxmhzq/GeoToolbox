import { ipcRenderer } from 'electron';
import { logger } from '@logger/index';
import { IpcInterface, TourGuidePage } from '../../enums/globalEnum';

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

export function openTourGuide(tourPage: TourGuidePage) {
  ipcRenderer.send(IpcInterface.OPEN_TOUR_GUIDE, tourPage);
}

export function addToken(token: IToken) {
  ipcRenderer.send(IpcInterface.ADD_TOKEN, token);
}

export function deleteToken(token: { type: string, value: string }) {
  ipcRenderer.send(IpcInterface.DELETE_TOKEN, token);
}

export function getTokensList(callback: (tl: TokensList) => void) {
  ipcRenderer.send(IpcInterface.GET_TOKENSLIST);
  ipcRenderer.once(IpcInterface.GET_TOKENSLIST_RESPONSE, (event, tl: TokensList) => {
    callback(tl);
  })
}