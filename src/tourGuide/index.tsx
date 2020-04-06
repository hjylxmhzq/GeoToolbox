import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/iconfont.css';
import './index.less';
import BaiduLBS from './baiduLBS';

function App() {
    return <div><BaiduLBS /></div>
}

ReactDOM.render(<App />, document.getElementById('root'));