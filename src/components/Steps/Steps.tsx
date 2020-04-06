import React, { useState, useEffect } from 'react';
import './Steps.less';

interface IStepsProps {
    onChangeStep?: (currentStep: number) => void;
    children: React.ReactElement[] | React.ReactElement;
}

const ANIMATION_DURATION = 300; //ms

interface IBottomBarProps {
    finished?: boolean;
    enableNextButton?: boolean;
    onNext?: () => void;
    onPrev?: () => void;
    onFinish?: () => void;
}

function BottomBar(props: IBottomBarProps) {
    const onNext = props.onNext ? (e: React.MouseEvent) => { props.onNext() } : () => { };
    const onPrev = props.onPrev ? (e: React.MouseEvent) => { props.onPrev() } : () => { };

    return <div className="steps-bottonbar">
        {props.finished ? <span className="steps-bottonbar-button">完成</span>
            : <span className="steps-bottonbar-button" onClick={onNext}>下一步</span>}
        <span className="steps-bottonbar-button" onClick={onPrev}>返回</span>
    </div>
}

export function Steps(props: IStepsProps) {
    const [currentStep, changeCurrentStep] = useState<number>(0);
    const [isChanging, toggleIsChanging] = useState<number>(0);
    const children = Array.isArray(props.children) ? props.children : [props.children]
    const stepCount = children.length;
    const onNextPage = function () {
        if (currentStep >= stepCount - 1) {
            return void 0;
        }
        toggleIsChanging(-1);
        window.setTimeout(() => {
            changeCurrentStep(currentStep + 1);
            toggleIsChanging(0);
        }, ANIMATION_DURATION);
    }
    const onPrevPage = function () {
        if (currentStep <= 0) {
            return void 0;
        }
        toggleIsChanging(1);
        window.setTimeout(() => {
            changeCurrentStep(currentStep - 1);
            toggleIsChanging(0);
        }, ANIMATION_DURATION);
    }
    const animationClassName = isChanging === 0 ? 'steps-changing-animation-fadein' :
        isChanging === -1 ? 'steps-changing-animation-leftout' :
            'steps-changing-animation-rightout';
    return (
        <div className="steps-box">
            <div className={animationClassName}>{props.children[currentStep]}</div>
            <BottomBar onNext={onNextPage} onPrev={onPrevPage} />
        </div>
    )
}