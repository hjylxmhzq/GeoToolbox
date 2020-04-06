import React, { useState, useEffect } from 'react';
import { getFilesList, openFileEditor } from '@root/ipcRenderer';
import './FileList.less';

function FileList() {
  const [files, useFile] = useState([] as FilesList);
  getFilesList((e, f) => {
    console.log('get file')
    if (f.length !== files.length) useFile(f);
  })
  return (
    <div>
      <div className="filelist-head">近期文件</div>
      {files.map((file) => {
        return (
        <div
          key={file.FILEID}
          onClick={() => {
            file.FILEPATH.endsWith('.csv') && openFileEditor(file.FILEPATH);
          }}
          className="filelist-item"
        >
          {file.FILEPATH}
          <span className="filelist-open">打开</span>
        </div>)
      })}
    </div>
  );
}
export default FileList;