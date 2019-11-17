import React, { useState, useEffect } from 'react';
import { addFileReloadInFileEditor } from '@root/ipcRenderer';

function DataTable() {
  const [data, useData] = useState('no data');
  useEffect(() => {
    addFileReloadInFileEditor((fileContent) => {
      useData(fileContent);
    })
  }, [])
  return (
    <div>{data}</div>
  )
}

export default DataTable;