const { app } = require('electron');
const appFac = require('./appFac');
const initMenu = require('./menu');

//global.wins存放所有打开的窗口对象
global.wins = {
  main: null,
};

appFac(app);
initMenu();