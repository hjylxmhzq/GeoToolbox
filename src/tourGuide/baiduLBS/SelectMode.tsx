import React from 'react';
import { SelectModeEnum, SelectServiceEnum } from './enums';
import Selector from '@root/components/Selector';

interface ISelectModeProps {
    onModeChange: (mode: SelectModeEnum) => void;
    onSeviceChange: (service: SelectServiceEnum) => void;
}

export default function SelectMode(props: ISelectModeProps) {
    const onSelectMode = function (currentIndex: number, currentValue: string) {
        props.onModeChange(currentIndex === 0 ? SelectModeEnum.Single : SelectModeEnum.Batch);
    }
    const onSelectSevice = function (currentIndex: number, currentValue: string) {
        props.onSeviceChange(SelectServiceEnum[SelectServiceEnum[currentIndex]]);
    }
    return <div>
        <Selector options={['手动模式', '批量模式']} onSelect={onSelectMode} />
        <Selector options={['地点检索服务', '地理编码服务']} onSelect={onSelectSevice} />
    </div>
}
