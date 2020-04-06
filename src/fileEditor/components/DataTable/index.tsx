import React, { useState, useEffect, useRef } from 'react';
import { addFileReloadInFileEditor } from '@root/ipcRenderer';
import Loading from '@root/components/Loading';
import './DataTable.less'
import { throttle } from '@root/utils';

interface IDataFrameProps {
  data: string[][];
  head: string[] | null;
  position: { start: number, end: number };
}

function ButtonBar() {

}

enum SortType {
  Descend,
  Ascend
}


function DataFrame(props: IDataFrameProps) {
  const { head, data, position } = props;
  let grid = data.slice();
  const itemCount = grid.length;
  const [sortInfo, sortBy] = useState<{ sortType: SortType, sortIndex: number } | null>(null);
  const [editCell, edit] = useState<{ row: number, col: number, value: string } | null>(null);

  const sortClickHandler = function (idx: number, e: React.MouseEvent) {
    const sortInfo = { sortType: SortType.Descend, sortIndex: idx };
    console.log(sortInfo);
    sortBy(sortInfo);
  }

  if (sortInfo !== null) {
    console.log('begin sort', grid);
    grid.sort((a: string[], b: string[]) => {
      if (sortInfo.sortType === SortType.Descend) {
        return a[sortInfo.sortIndex] > b[sortInfo.sortIndex] ? 1 : -1
      }
    });
  }

  const cellDbClickHandler = function (row: number, col: number) {
    console.log('edit: ', row, col);
    const value = grid[row][col];
    edit({ row, col, value });
  }

  const cellValueChangeHandler = function (e: React.ChangeEvent<HTMLTextAreaElement>) {
    edit({ ...editCell, value: e.target.value })
  }

  const saveChangeToGrid = function (e: React.MouseEvent) {
    console.log('save change')
    if (editCell) {
      grid[editCell.row][editCell.col] = editCell.value;
      edit(null);
    }
  }

  return (
    <div className="dataframe" onClick={saveChangeToGrid}>
      {
        head &&
        (
          <div className="dataframe-head">
            <span>序号</span>
            {
              head.map((cell, idx) => {
                return (
                  <span
                    className={idx === (sortInfo && sortInfo.sortIndex) ? 'dataframe-col-highlight' : ''}
                    data-col={idx}
                    key={idx}
                    title={cell}
                    onClick={sortClickHandler.bind(null, idx)}>
                    <i className="dataframe-head-arrow iconfont iconicon-test"></i>
                    {cell}
                  </span>
                );
              })
            }
          </div>
        )
      }
      <div className="dataframe-body" style={{ paddingBottom: 40 * (itemCount - position.end), paddingTop: 40 * position.start }}>
        {
          grid.slice(position.start, position.end).map((row, rIdx) => {
            return <div className="dataframe-row" key={'row' + (position.start + rIdx)}>
              <span>{position.start + rIdx}</span>
              {
                row.map((cell, idx) => {
                  const editable = editCell && editCell.row === position.start + rIdx && editCell.col === idx ? true : false
                  return <span
                    onDoubleClick={cellDbClickHandler.bind(null, rIdx, idx)}
                    data-col={idx}
                    data-row={position.start + rIdx}
                    draggable="true"
                    className={idx === (sortInfo && sortInfo.sortIndex) ? 'dataframe-col-highlight' : ''}
                    key={'cell' + (idx)} title={cell}>{
                      editable ?
                        <textarea
                          onClick={(e: React.MouseEvent) => {
                            console.log('click in textarea')
                            e.stopPropagation();
                          }}
                          className="edit-cell"
                          onChange={cellValueChangeHandler}
                          value={editCell.value}>
                        </textarea> :
                        cell}
                  </span>;
                })
              }
            </div>;
          })
        }
      </div>
    </div>)
}

let throttleChangePositionHanlder = null;

function DataTable() {
  const [data, useData] = useState<null | string>(null);
  useEffect(() => {

    const changePositionHandler = function (e: React.UIEvent<HTMLDivElement>) {
      const scrollTop = tableRef.current.scrollTop;
      let start = Math.floor((scrollTop - 10 * 40) / 40);
      start = start < 0 ? 0 : start;
      const end = start + 40;
      changePosition({ start, end });
    }

    throttleChangePositionHanlder = throttle(changePositionHandler, 100, true);

    addFileReloadInFileEditor((fileContent) => {
      useData(fileContent);
    })
  }, []);
  const tableRef = useRef<HTMLDivElement>();
  const [position, changePosition] = useState<{ start: number, end: number }>({ start: 0, end: 40 });

  if (data === null) {
    return (
      <div className="data-table"><Loading /></div>
    )
  } else {
    const sep = ','
    const lines = data.split('\n');
    const grid = lines.map(line => line.split(sep));
    return <div className="data-table" onScroll={throttleChangePositionHanlder} ref={tableRef}>
      <DataFrame data={grid.slice(1)} head={grid[0]} position={position} />
    </div>
  }
}

export default DataTable;