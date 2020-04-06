import { dialog, ipcMain, BrowserWindow } from 'electron';
import db from '../sqlite';
import fs from 'fs';
import { IpcInterface, TourGuidePage, IToken } from '../../enums/globalEnum';
import createWindow from '../createWindow';
import { logger } from '@logger/index';

function addOpenFileHandler(ipcMain: Electron.IpcMain) {
  ipcMain.on(IpcInterface.OPEN_FILE, (event) => {
    const files = dialog.showOpenDialogSync({
      properties: ['openFile']
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
    logger.info('ipc handler: get file')
    fs.readFile(path, (err, fileContent) => {
      if (err) {
        logger.error(err);
        event.sender.send(IpcInterface.GET_FILE_RESPONSE, '');
      } else {
        logger.info(fileContent);
        event.sender.send(IpcInterface.GET_FILE_RESPONSE, fileContent.toString('utf-8'));
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
        logger.info('ipc: get file');
        fs.readFile(filePath, (err, fileContent) => {
          if (err) {
            logger.error(err);
            win.webContents.send(IpcInterface.GET_FILE_RESPONSE, '');
          } else {
            logger.info(fileContent);
            win.webContents.send(IpcInterface.GET_FILE_RESPONSE, fileContent.toString('utf-8'));
          }
        })
      });
    } 
  })
}

function addOpenTourGuideHandler(ipcMain: Electron.IpcMain) {
  ipcMain.on(IpcInterface.OPEN_TOUR_GUIDE, (event, tourPage: TourGuidePage) => {
    console.log('open guide page');
    if (!globalThis.wins.tourGuide) {
      const win = createWindow('tourGuide', `http://localhost:8080/tourGuide.html?page=${tourPage}`, `../dist/tourGuide.html?page=${tourPage}`);
    }
  });
}

function addTokenHandler(ipcMain: Electron.IpcMain) {
  ipcMain.on(IpcInterface.ADD_TOKEN, (event, token: IToken) => {
    console.log(IpcInterface.ADD_TOKEN, token);
    db.addToken(token.name, token.value, token.type);
  });
}

function deleteTokenHandler(ipcMain: Electron.IpcMain) {
  ipcMain.on(IpcInterface.DELETE_TOKEN, (event, token: IToken) => {
    console.log(IpcInterface.DELETE_TOKEN);
    db.deleteToken(token.type, token.value);
  });
}

function getTokensListHandler(ipcMain: Electron.IpcMain) {
  ipcMain.on(IpcInterface.GET_TOKENSLIST, (event) => {
    console.log(IpcInterface.GET_TOKENSLIST);
    db.getTokensList().then(tokensList => {
      event.sender.send(IpcInterface.GET_TOKENSLIST_RESPONSE, tokensList);
    })
  });
}
export default [
  addOpenFileHandler,
  addGetFilesListHandler,
  addGetFileHandler,
  addOpenFileEditorHandler,
  addOpenTourGuideHandler,
  addTokenHandler,
  deleteTokenHandler,
  getTokensListHandler,
];