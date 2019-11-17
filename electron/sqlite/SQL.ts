const SQL = {
  createFileTable: () => `CREATE TABLE files (
    FILEPATH TEXT NOT NULL,
    FILECONTENT TEXT NOT NULL,
    FILEID TEXT INT NULL
    );`,
  deleteFileTable: () => `DROP TABLE files;`,
  addFile: (filePath, fileContent, fileId) => {
    return `INSERT INTO files (FILEPATH,FILECONTENT,FILEID)
VALUES ('${filePath}', '${fileContent}', ${fileId});`
  },
  getFilesList: () => {
    return `SELECT FILEPATH, FILEID FROM files;`
  }
};

export default SQL;