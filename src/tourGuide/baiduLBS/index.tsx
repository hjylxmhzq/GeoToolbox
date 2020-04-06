import React, { useState } from 'react';
import Steps from '@root/components/Steps';
import SelectMode from './SelectMode';
import { SelectModeEnum, SelectServiceEnum } from './enums';
import SelectOptioin from './SelectOption';
import Process from './Process';

export interface IDataOption {
    SelectMode: SelectModeEnum;
    SelectService: SelectServiceEnum;
    SelectBaiduAk: string;
}

const iniDataOption: IDataOption = {
    SelectMode: SelectModeEnum.Single,
    SelectService: SelectServiceEnum.placeapi,
    SelectBaiduAk: '',
}

export default function BaiduLBS() {
    const [dataOption, changeDataOption] = useState<IDataOption>(iniDataOption);

    console.log(dataOption);
    const selectModeChange = function (mode: SelectModeEnum) {
        changeDataOption({ ...dataOption, SelectMode: mode });
    }
    const selectServiceChange = function (service: SelectServiceEnum) {
        changeDataOption({ ...dataOption, SelectService: service });
    }

    return <Steps>
        <SelectMode onModeChange={selectModeChange} onSeviceChange={selectServiceChange}/>
        <SelectOptioin dataOption={dataOption} changeDataOption={changeDataOption}/>
        <Process dataOption={dataOption} changeDataOption={changeDataOption}/>
    </Steps>
}