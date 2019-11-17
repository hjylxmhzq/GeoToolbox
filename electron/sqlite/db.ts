import { verbose } from 'sqlite3';
import SQL from './SQL';
import logger from '../logger';

const sqlite3 = verbose();

global.db = new sqlite3.Database('geo.db', (e: ErrorEvent) => {
  if (e) throw e;
});

let fileId = 0;
let db = global.db;

function initDB() {
  return new Promise((resolve, reject) => {
    db.run(SQL.deleteFileTable(), function (e: ErrorEvent) {
      if (e === null) {
        logger.info('delete existed files table in DB');
        db.run(SQL.createFileTable(), function (e) {
          if (e === null) {
            resolve();
          } else {
            reject(e);
          }
        });
      } else {
        logger.error(e);
        db.run(SQL.createFileTable(), function (e) {
          if (e === null) {
            resolve();
          } else {
            reject(e);
          }
        });
      }
    });
  })
}


function addFile(filePath, fileContent) {
  const sql = SQL.addFile(filePath, 'fileContent', fileId);
  logger.info(sql);
  return new Promise((resolve, reject) => {
    db.run(sql, e => {
      if (e === null) {
        resolve(fileId++);
      } else {
        reject(e);
      }
    })
  })
}

function getFilesList(): Promise<undefined | FilesList> {
  return new Promise((resolve, reject) => {
    db.all(SQL.getFilesList(), (err, values: FilesList) => {
      !err && resolve(values);
      if (err) {
        logger.error(err);
      }
    })
  })
}

export default {
  initDB,
  addFile,
  getFilesList,
}
