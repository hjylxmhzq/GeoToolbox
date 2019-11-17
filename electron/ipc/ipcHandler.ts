import { dialog, ipcMain, BrowserWindow } from 'electron';
import db from '../sqlite';
import fs from 'fs';
import { IpcInterface } from '../../enums/globalEnum';
import createWindow from '../createWindow';

function addOpenFileHandler(ipcMain: Electron.IpcMain) {
  ipcMain.on(IpcInterface.OPEN_FILE, (event) => {
    const files = dialog.showOpenDialogSync({
      properties: ['openFile', 'openDirectory']
    });
    if (files) {
      const promises = [];
      for (let file of files) {
        promises.push(db.addFile(file, encodeURIComponent(fs.readFileSync(file, { encoding: 'utf-8' }))));
      }
      Promise.all(promises).then(() => {
        event.sender.send(IpcInterface.OPEN_FILE_RESPONSE, true);
      })
    } else {
      event.sender.send(IpcInterface.OPEN_FILE_RESPONSE, true);
    }
  });
}

function addGetFileHandler(ipcMain: Electron.IpcMain) {
  ipcMain.on(IpcInterface.GET_FILE, (event, path: string) => {
    fs.readFile(path, (err, fileContent) => {
      if (err) {
        event.sender.send(IpcInterface.GET_FILE_RESPONSE, fileContent.toString('utf-8'));
      } else {
        event.sender.send(IpcInterface.GET_FILE_RESPONSE, '');
      }
    })
  });
}

function addGetFilesListHandler(ipcMain: Electron.IpcMain) {
  ipcMain.on(IpcInterface.GET_FILESLIST, (event) => {
    console.log('get-fileslist recieved');
    db.getFilesList().then((filesList) => {
      event.sender.send(IpcInterface.GET_FILESLIST_RESPONSE, filesList && filesList.length ? filesList : []);
    })
  });
}

function addOpenFileEditorHandler(ipcMain: Electron.IpcMain) {
  ipcMain.on(IpcInterface.OPEN_FILE_EDITOR, (event, filePath: string) => {
    console.log('open file editor');
    if (globalThis.wins.fileEditor) {
      globalThis.wins.fileEditor.webContents.send(IpcInterface.GET_FILE, filePath);
    } else {
      const win = createWindow('fileEditor', 'http://localhost:8080/fileEditor.html', '../dist/fileEditor.html');
      win.webContents.on('did-finish-load', () => {
        win.webContents.send(IpcInterface.GET_FILE, filePath);
      });
    }
  })
}

export default [
  addOpenFileHandler,
  addGetFilesListHandler,
  addGetFileHandler,
  addOpenFileEditorHandler,
];