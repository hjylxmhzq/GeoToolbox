const SQL = {
  createFileTable: () => `CREATE TABLE files (
    FILEPATH TEXT NOT NULL,
    FILECONTENT TEXT NOT NULL,
    FILEID TEXT INT NULL
    );`,
  deleteFileTable: () => `DROP TABLE files;`,
  deleteTokenTable: () => `DROP TABLE tokens;`,
  addFile: (filePath, fileContent, fileId) => {
    return `INSERT INTO files (FILEPATH,FILECONTENT,FILEID)
VALUES ('${filePath}', '${fileContent}', ${fileId});`
  },
  deleteFile: (fileId) => {
    return `DELETE FROM files
    WHERE FILEID=${fileId};`
  },
  getFilesList: () => {
    return `SELECT FILEPATH, FILEID FROM files;`
  },
  createTokenTable: () => {
    return `CREATE TABLE tokens (
      name TEXT NOT NULL,
      value TEXT NOT NULL,
      type TEXT NOT NULL
      );`
  },
  addToken: (name: string, value: string, type: string) => {
    return `INSERT INTO tokens (name, value, type)
    VALUES ('${name}', '${value}', '${type}');`;
  },
  deleteToken: (type: string, value: string) => {
    return `DELETE FROM tokens
    WHERE value='${value} AND type='${type}';`;
  },
  getTokensList: () => {
    return `SELECT name, value, type FROM tokens;`;
  }
};

export default SQL;