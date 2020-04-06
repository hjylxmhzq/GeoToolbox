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
        db.run(SQL.deleteTokenTable(), function(e: ErrorEvent) {
          if (e === null) {
            logger.info('delete existed files table in DB');
            db.run(SQL.createFileTable(), function (e) {
              if (e === null) {
                logger.info('create file table')
                db.run(SQL.createTokenTable(), function (e) {
                  if (e === null) {
                    resolve();
                    logger.info('create token table')
                  } else {
                    logger.error(e);
                    reject(e);
                  }
                });
              } else {
                logger.error(e);
                reject(e);
              }
            });
          } else {
            logger.error(e);
          }
        })
      } else {
        logger.error(e);
        db.run(SQL.createFileTable(), function (e) {
          if (e === null) {
            logger.info('create file table')
            db.run(SQL.createTokenTable(), function (e) {
              if (e === null) {
                resolve();
                logger.info('create token table')
              } else {
                logger.error(e);
                reject(e);
              }
            });
          } else {
            logger.error(e);
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

function deleteFile(fileId) {
  const sql = SQL.deleteFile(fileId);
  logger.info(sql);
  return new Promise((resolve, reject) => {
    db.run(sql, e => {
      if (e === null) {
        resolve();
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

function addToken(name: string, value: string, type: string) {
  return new Promise((resolve, reject) => {
    db.all(SQL.addToken(name, value, type), (err) => {
      !err && resolve();
      if (err) {
        logger.error(err);
      }
    });
  });
}

function deleteToken(type: string, value: string) {
  return new Promise((resolve, reject) => {
    db.all(SQL.deleteToken(type, value), (err) => {
      !err && resolve();
      if (err) {
        logger.error(err);
      }
    });
  });
}

function getTokensList(): Promise<undefined | TokensList> {
  return new Promise((resolve, reject) => {
    db.all(SQL.getTokensList(), (err, values: TokensList) => {
      !err && resolve(values);
      if (err) {
        logger.error(err);
        resolve();
      }
    })
  })
}

export default {
  initDB,
  addFile,
  getFilesList,
  deleteFile,
  addToken,
  deleteToken,
  getTokensList
}
