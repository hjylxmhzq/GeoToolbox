import { app, ipcMain } from 'electron';
import appFac from './appFac';
import initMenu from './menu';
import addIpcListeners from './ipc';
import db from './sqlite';
import logger from './logger';

//global.wins存放所有打开的窗口对象
globalThis.wins = {
  main: null,
};

globalThis.isDBReady = false;

// -------- initialize DataBase with async function
db.initDB().then(() => {
  logger.info('database init')
  globalThis.isDBReady = true;
}, (e: Error) => {
  logger.error(e);
});

appFac(app);
initMenu();
addIpcListeners(ipcMain);
