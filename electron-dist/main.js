/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./electron/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./electron/appFac.ts":
/*!****************************!*\
  !*** ./electron/appFac.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var createWindow_1 = __importDefault(__webpack_require__(/*! ./createWindow */ "./electron/createWindow.ts"));
function appFac(app) {
    app.on('ready', createWindow_1.default.bind(this, 'main', 'http://localhost:8080/index.html', '../dist/index.html'));
    app.on('window-all-closed', function () {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });
    app.on('activate', function () {
        if (globalThis.wins.main === null) {
            createWindow_1.default('main', 'http://localhost:8080/index.html', '../dist/index.html');
        }
    });
}
exports.default = appFac;


/***/ }),

/***/ "./electron/createWindow.ts":
/*!**********************************!*\
  !*** ./electron/createWindow.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var electron_2 = __webpack_require__(/*! electron */ "electron");
function createWindow(windowName, url, path) {
    var wins = globalThis.wins;
    wins[windowName] = new electron_2.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });
    if ("development".includes('dev')) {
        wins.main.loadURL(url);
    }
    else {
        wins.main.loadFile(path);
    }
    wins[windowName].on('closed', function () {
        wins[windowName] = null;
    });
    return wins[windowName];
}
exports.default = createWindow;


/***/ }),

/***/ "./electron/ipc/index.ts":
/*!*******************************!*\
  !*** ./electron/ipc/index.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ipcMain_1 = __importDefault(__webpack_require__(/*! ./ipcMain */ "./electron/ipc/ipcMain.ts"));
exports.default = ipcMain_1.default;


/***/ }),

/***/ "./electron/ipc/ipcHandler.ts":
/*!************************************!*\
  !*** ./electron/ipc/ipcHandler.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_3 = __webpack_require__(/*! electron */ "electron");
var sqlite_2 = __importDefault(__webpack_require__(/*! ../sqlite */ "./electron/sqlite/index.ts"));
var fs_1 = __importDefault(__webpack_require__(/*! fs */ "fs"));
var globalEnum_1 = __webpack_require__(/*! ../../enums/globalEnum */ "./enums/globalEnum.ts");
var createWindow_2 = __importDefault(__webpack_require__(/*! ../createWindow */ "./electron/createWindow.ts"));
function addOpenFileHandler(ipcMain) {
    ipcMain.on(globalEnum_1.IpcInterface.OPEN_FILE, function (event) {
        var files = electron_3.dialog.showOpenDialogSync({
            properties: ['openFile', 'openDirectory']
        });
        if (files) {
            var promises = [];
            for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
                var file = files_1[_i];
                promises.push(sqlite_2.default.addFile(file, encodeURIComponent(fs_1.default.readFileSync(file, { encoding: 'utf-8' }))));
            }
            Promise.all(promises).then(function () {
                event.sender.send(globalEnum_1.IpcInterface.OPEN_FILE_RESPONSE, true);
            });
        }
        else {
            event.sender.send(globalEnum_1.IpcInterface.OPEN_FILE_RESPONSE, true);
        }
    });
}
function addGetFileHandler(ipcMain) {
    ipcMain.on(globalEnum_1.IpcInterface.GET_FILE, function (event, path) {
        fs_1.default.readFile(path, function (err, fileContent) {
            if (err) {
                event.sender.send(globalEnum_1.IpcInterface.GET_FILE_RESPONSE, fileContent.toString('utf-8'));
            }
            else {
                event.sender.send(globalEnum_1.IpcInterface.GET_FILE_RESPONSE, '');
            }
        });
    });
}
function addGetFilesListHandler(ipcMain) {
    ipcMain.on(globalEnum_1.IpcInterface.GET_FILESLIST, function (event) {
        console.log('get-fileslist recieved');
        sqlite_2.default.getFilesList().then(function (filesList) {
            event.sender.send(globalEnum_1.IpcInterface.GET_FILESLIST_RESPONSE, filesList && filesList.length ? filesList : []);
        });
    });
}
function addOpenFileEditorHandler(ipcMain) {
    ipcMain.on(globalEnum_1.IpcInterface.OPEN_FILE_EDITOR, function (event, filePath) {
        console.log('open file editor');
        if (globalThis.wins.fileEditor) {
            globalThis.wins.fileEditor.webContents.send(globalEnum_1.IpcInterface.GET_FILE, filePath);
        }
        else {
            var win_1 = createWindow_2.default('fileEditor', 'http://localhost:8080/fileEditor.html', '../dist/fileEditor.html');
            win_1.webContents.on('did-finish-load', function () {
                win_1.webContents.send(globalEnum_1.IpcInterface.GET_FILE, filePath);
            });
        }
    });
}
exports.default = [
    addOpenFileHandler,
    addGetFilesListHandler,
    addGetFileHandler,
    addOpenFileEditorHandler,
];


/***/ }),

/***/ "./electron/ipc/ipcMain.ts":
/*!*********************************!*\
  !*** ./electron/ipc/ipcMain.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ipcHandler_1 = __importDefault(__webpack_require__(/*! ./ipcHandler */ "./electron/ipc/ipcHandler.ts"));
function addIpcListeners(ipcMain) {
    for (var _i = 0, ipcHandlers_1 = ipcHandler_1.default; _i < ipcHandlers_1.length; _i++) {
        var ipcHandler = ipcHandlers_1[_i];
        ipcHandler(ipcMain);
    }
}
exports.default = addIpcListeners;


/***/ }),

/***/ "./electron/logger/index.js":
/*!**********************************!*\
  !*** ./electron/logger/index.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

class Logger {
  error(...msg) {
    console.error(...msg);
  }
  info(...msg) {
    console.info(...msg);
  }
}

const logger = new Logger();

module.exports = logger;

/***/ }),

/***/ "./electron/main.ts":
/*!**************************!*\
  !*** ./electron/main.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = __webpack_require__(/*! electron */ "electron");
var appFac_1 = __importDefault(__webpack_require__(/*! ./appFac */ "./electron/appFac.ts"));
var menu_1 = __importDefault(__webpack_require__(/*! ./menu */ "./electron/menu.js"));
var ipc_1 = __importDefault(__webpack_require__(/*! ./ipc */ "./electron/ipc/index.ts"));
var sqlite_1 = __importDefault(__webpack_require__(/*! ./sqlite */ "./electron/sqlite/index.ts"));
var logger_1 = __importDefault(__webpack_require__(/*! ./logger */ "./electron/logger/index.js"));
globalThis.wins = {
    main: null,
};
globalThis.isDBReady = false;
sqlite_1.default.initDB().then(function () {
    logger_1.default.info('database init');
    globalThis.isDBReady = true;
}, function (e) {
    logger_1.default.error(e);
});
appFac_1.default(electron_1.app);
menu_1.default();
ipc_1.default(electron_1.ipcMain);


/***/ }),

/***/ "./electron/menu.js":
/*!**************************!*\
  !*** ./electron/menu.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);


let template = [{
    label: '编辑',
    submenu: [{
        label: '撤销',
        accelerator: 'CmdOrCtrl+Z',
        role: 'undo'
    }, {
        label: '重做',
        accelerator: 'Shift+CmdOrCtrl+Z',
        role: 'redo'
    }, {
        type: 'separator'
    }, {
        label: '剪切',
        accelerator: 'CmdOrCtrl+X',
        role: 'cut'
    }, {
        label: '复制',
        accelerator: 'CmdOrCtrl+C',
        role: 'copy'
    }, {
        label: '粘贴',
        accelerator: 'CmdOrCtrl+V',
        role: 'paste'
    }, {
        label: '全选',
        accelerator: 'CmdOrCtrl+A',
        role: 'selectall'
    }]
}, {
    label: 'dev',
    submenu: [{
        label: '重载',
        accelerator: 'CmdOrCtrl+R',
        click: function (item, focusedWindow) {
            if (focusedWindow) {
                focusedWindow.reload()
            }
        }
    }, {
        label: '切换全屏',
        accelerator: (function () {
            if (process.platform === 'darwin') {
                return 'Ctrl+Command+F'
            } else {
                return 'F11'
            }
        })(),
        click: function (item, focusedWindow) {
            if (focusedWindow) {
                focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
            }
        }
    }, {
        label: '切换开发者工具',
        accelerator: (function () {
            if (process.platform === 'darwin') {
                return 'Shift+Command+I'
            } else {
                return 'Ctrl+Shift+I'
            }
        })(),
        click: function (item, focusedWindow) {
            if (focusedWindow) {
                focusedWindow.toggleDevTools()
            }
        }
    }]
}, {
    label: '窗口',
    role: 'window',
    submenu: [{
        label: '最小化',
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize'
    }, {
        label: '关闭',
        accelerator: 'CmdOrCtrl+W',
        role: 'close'
    }, {
        type: 'separator'
    }]
}]

function initMenu() {
    if ("development".includes('pro')) {
        template = template.filter(item => {
            if (item.label === 'dev') {
                return false;
            }
            return true;
        })
    }
    const menu = electron__WEBPACK_IMPORTED_MODULE_0__["Menu"].buildFromTemplate(template)
    electron__WEBPACK_IMPORTED_MODULE_0__["Menu"].setApplicationMenu(menu)
}

/* harmony default export */ __webpack_exports__["default"] = (initMenu);

/***/ }),

/***/ "./electron/sqlite/SQL.ts":
/*!********************************!*\
  !*** ./electron/sqlite/SQL.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SQL = {
    createFileTable: function () { return "CREATE TABLE files (\n    FILEPATH TEXT NOT NULL,\n    FILECONTENT TEXT NOT NULL,\n    FILEID TEXT INT NULL\n    );"; },
    deleteFileTable: function () { return "DROP TABLE files;"; },
    addFile: function (filePath, fileContent, fileId) {
        return "INSERT INTO files (FILEPATH,FILECONTENT,FILEID)\nVALUES ('" + filePath + "', '" + fileContent + "', " + fileId + ");";
    },
    getFilesList: function () {
        return "SELECT FILEPATH, FILEID FROM files;";
    }
};
exports.default = SQL;


/***/ }),

/***/ "./electron/sqlite/db.ts":
/*!*******************************!*\
  !*** ./electron/sqlite/db.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sqlite3_1 = __webpack_require__(/*! sqlite3 */ "sqlite3");
var SQL_1 = __importDefault(__webpack_require__(/*! ./SQL */ "./electron/sqlite/SQL.ts"));
var logger_2 = __importDefault(__webpack_require__(/*! ../logger */ "./electron/logger/index.js"));
var sqlite3 = sqlite3_1.verbose();
global.db = new sqlite3.Database('geo.db', function (e) {
    if (e)
        throw e;
});
var fileId = 0;
var db = global.db;
function initDB() {
    return new Promise(function (resolve, reject) {
        db.run(SQL_1.default.deleteFileTable(), function (e) {
            if (e === null) {
                logger_2.default.info('delete existed files table in DB');
                db.run(SQL_1.default.createFileTable(), function (e) {
                    if (e === null) {
                        resolve();
                    }
                    else {
                        reject(e);
                    }
                });
            }
            else {
                logger_2.default.error(e);
                db.run(SQL_1.default.createFileTable(), function (e) {
                    if (e === null) {
                        resolve();
                    }
                    else {
                        reject(e);
                    }
                });
            }
        });
    });
}
function addFile(filePath, fileContent) {
    var sql = SQL_1.default.addFile(filePath, 'fileContent', fileId);
    logger_2.default.info(sql);
    return new Promise(function (resolve, reject) {
        db.run(sql, function (e) {
            if (e === null) {
                resolve(fileId++);
            }
            else {
                reject(e);
            }
        });
    });
}
function getFilesList() {
    return new Promise(function (resolve, reject) {
        db.all(SQL_1.default.getFilesList(), function (err, values) {
            !err && resolve(values);
            if (err) {
                logger_2.default.error(err);
            }
        });
    });
}
exports.default = {
    initDB: initDB,
    addFile: addFile,
    getFilesList: getFilesList,
};


/***/ }),

/***/ "./electron/sqlite/index.ts":
/*!**********************************!*\
  !*** ./electron/sqlite/index.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = __importDefault(__webpack_require__(/*! ./db */ "./electron/sqlite/db.ts"));
exports.default = db_1.default;


/***/ }),

/***/ "./enums/globalEnum.ts":
/*!*****************************!*\
  !*** ./enums/globalEnum.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var IpcInterface = {
    GET_FILE: 'get-file',
    GET_FILE_RESPONSE: 'get-file-response',
    GET_FILESLIST: 'get-fileslist',
    GET_FILESLIST_RESPONSE: 'get-fileslist-response',
    OPEN_FILE: 'open-file',
    OPEN_FILE_RESPONSE: 'open-file-response',
    OPEN_FILE_EDITOR: 'open-file-editor',
    OPEN_FIlE_EDITOR_RESPONSE: 'open-file-editor-response',
    RELOAD_FILE: 'reload-file',
    RELOAD_FILE_RESPONSE: 'reload-file-response',
    GET_FILE_CONTENT: 'get-file-content',
    GET_FILE_CONTENT_RESPONSE: 'get-file-content-response',
};
exports.IpcInterface = IpcInterface;


/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "sqlite3":
/*!**************************!*\
  !*** external "sqlite3" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sqlite3");

/***/ })

/******/ });
//# sourceMappingURL=main.js.map