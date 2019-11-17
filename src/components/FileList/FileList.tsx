import React, { useState, useEffect } from 'react';
import { getFilesList, openFileEditor } from '@root/ipcRenderer';

function FileList() {
  const [files, useFile] = useState([] as FilesList);
  getFilesList((e, f) => {
    console.log('get file')
    if (f.length !== files.length) useFile(f);
  })
  return (
    <div>
      {files.map((file) => {
        return (
        <div
          key={file.FILEID}
          onClick={() => {
            openFileEditor('/Users/tonyhu/Documents/docs/2019.10.21推荐书籍.md');
          }}
        >
          {file.FILEPATH}
        </div>)
      })}
    </div>
  );
}
export default FileList;