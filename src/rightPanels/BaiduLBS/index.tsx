import React from 'react';
import { openTourGuide } from '@root/ipcRenderer';
import { TourGuidePage } from '../../../enums/globalEnum';

function openGuide() {
    openTourGuide(TourGuidePage.BAIDU_LBS);
}

export default function BaiduLBSIntroduction() {
    return <div>这里是介绍<button onClick={openGuide}>开始</button></div>
}