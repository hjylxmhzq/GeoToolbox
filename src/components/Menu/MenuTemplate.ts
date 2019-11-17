import { MenuItem } from './Menu';
import { openFile } from '@root/ipcRenderer';

const menuTemplate: MenuItem[] = [{
  name: "文件",
  submenu: [{
    name: '打开CSV文件',
    submenu: null,
    onClick: () => {
      openFile((e, r) => {
        console.log(r);
      });
    },
    link: '/filelist'
  }, {
    name: '已打开文件',
    submenu: null,
    link: '/filelist'
  }],
}, {
  name: "可视化",
  submenu: [{
    name: '统计数据',
    submenu: null,
  }, {
    name: '空间数据',
    submenu: null,
  }],
}, {
  name: "title",
  submenu: [{
    name: 'title1',
    submenu: [{
      name: "title",
      submenu: [{
        name: 'title1',
        submenu: null,
      }, {
        name: 'title2',
        submenu: [{
          name: "title",
          submenu: [{
            name: 'title1',
            submenu: null,
          }, {
            name: 'title2',
            submenu: null,
          }],
        }],
      }],
    }],
  }, {
    name: 'title2',
    submenu: null,
  }],
}
];

export default menuTemplate;