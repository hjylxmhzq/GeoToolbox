import React, { useState, useEffect } from 'react';
import { SelectModeEnum, SelectServiceEnum } from './enums';
import Selector from '@root/components/Selector';
import { IDataOption } from '.';
import { getTokensList, addToken } from '@root/ipcRenderer';
import Map from '@root/components/Map';

interface ISelectOptioinProps {
    dataOption: IDataOption;
    changeDataOption: (dataOptioin: IDataOption) => void;
}

export default function Process(props: ISelectOptioinProps) {
    const [baiduAks, setBaiduAks] = useState<string[]>(['enpty'])
    useEffect(function () {
        addToken({type: 'baiduak', name: 'myBaiduLbsToken', value: 'r8hqpHiu8z8O7Cgo9mGveNLuNEqKZOpM'});
        getTokensList((tl: TokensList) => {
            console.log('tl: ', tl);
            setBaiduAks(tl.filter(tk => tk.TYPE === 'baiduak').map(tk => tk.VALUE));
        })
    }, []);
    const onSelectBaiduAk = function (index: number, value: string) {
        props.changeDataOption({...props.dataOption, SelectBaiduAk: value});
    }
    return <div>
        <Map />
    </div>
}
