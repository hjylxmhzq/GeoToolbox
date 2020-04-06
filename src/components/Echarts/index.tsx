import React, { useEffect, useState, useRef } from 'react'
import './Echarts.less';

import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/map';
import 'echarts/lib/chart/scatter';
import 'echarts/lib/chart/custom';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/extension/bmap/bmap';
import './BMap.js';

interface IEchartsProps {
    option: any;
    notMerge: boolean;
    onEvent: (args: any[]) => void
}
let myChart = null;

export default function ReactEcharts(props: IEchartsProps): JSX.Element {
    const chartRef = useRef();
    useEffect(function () {
        const resizeListener = function () {
            console.log('resize', myChart)
            myChart && myChart.resize();
        }

        myChart = echarts.init(chartRef.current);
        myChart.setOption(props.option, props.notMerge);
        window.addEventListener('resize', resizeListener);
        console.log('add click listener')
        myChart.on('click', function(e){
            console.log(e);
			props.onEvent(e);
		});
        return function () {
            myChart.dispose();
            window.removeEventListener('resize', resizeListener);
        }
    }, []);
    useEffect(function () {
        myChart && myChart.setOption(props.option, props.notMerge);
    });
    return <div ref={chartRef} className="chart-box"></div>
}