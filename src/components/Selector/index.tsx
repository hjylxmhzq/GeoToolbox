import React, { useState, useEffect, useRef } from 'react';
import classnames from 'classnames';
import { createPortal } from 'react-dom';
import './Selector.less';

interface ISelectorProps<T> {
    onSelect?: (currentIndex: number, currentValue: T) => void;
    options: string[];
}

interface ISelectorPopoverProps {
    show: PopoverStatus;
    options: string[];
    position: { left: number, top: number, width: number };
    onMouseLeave: (e: React.MouseEvent<HTMLDivElement>) => void;
    onSelect: (e: React.MouseEvent<HTMLDivElement>) => void;
    selectorId: string;
}

function SelectorPopover(props: ISelectorPopoverProps) {
    let popoverStatus = 'selector-popover';
    switch (props.show) {
        case PopoverStatus.Opened: break;
        case PopoverStatus.Opening: popoverStatus = 'selector-popover-opening'; break;
        case PopoverStatus.Closing: popoverStatus = 'selector-popover-closing'; break;
        case PopoverStatus.Closed: popoverStatus = 'selector-popover-hide'; break;
        default: break;
    }

    return <div
        className={
            classnames("selector-popover", popoverStatus, props.selectorId)
        }
        style={{ ...props.position }}
        onMouseLeave={props.onMouseLeave}
    >
        <div className={classnames("selector-popover-insidebox", props.selectorId)}>
            {
                props.options.map((option, idx) => {
                    return <div title={option} data-index={idx} key={option + idx} className={classnames("selector-popover-option", props.selectorId)} onClick={props.onSelect}>{option}</div>
                })
            }
        </div>
    </div>
}

const ANIMATION_DURATION = 200; //ms

enum PopoverStatus {
    Closed,
    Closing,
    Opening,
    Opened
}

export default function Selector(props: ISelectorProps<string>) {
    const [currentSelectIndex, changeCurrentSelectIndex] = useState<number>(0);
    const [isShow, toggleButton] = useState<PopoverStatus>(PopoverStatus.Closed);
    const [popoverPosition, setPosition] = useState<{ left: number, top: number, width: number }>({ left: 0, top: 0, width: 0 })
    const selectorPopoverNode = useRef(document.createElement('div'));
    const timer = useRef<number | null>(null);
    const [selectorId, setSelectorId] = useState<string>();
    const selectorButtonRef = useRef<HTMLDivElement>();
    useEffect(function () {
        selectorPopoverNode.current.className = "popover-mount-node"
        document.body.appendChild(selectorPopoverNode.current);
        setSelectorId('id_' + Math.random().toString().substr(3));
        return function () {
            selectorPopoverNode.current.remove();
        }
    }, []);

    const onSelect = function (e: React.MouseEvent<HTMLDivElement>) {
        const target = e.target as HTMLDivElement;
        const currentIndex = parseInt(target.dataset['index']);
        const currentValue = props.options[currentIndex];
        props.onSelect && props.onSelect(currentIndex, currentValue);
        changeCurrentSelectIndex(currentIndex);
    }

    const showOptions = function (e: React.MouseEvent<HTMLDivElement>) {
        const boundingRect = selectorButtonRef.current.getBoundingClientRect();
        setPosition({ left: boundingRect.left, top: boundingRect.top + boundingRect.height, width: boundingRect.width });
        if (isShow === PopoverStatus.Opened || isShow === PopoverStatus.Closing) {
            return void 0;
        }
        toggleButton(PopoverStatus.Opening);
        clearTimeout(timer.current);
        timer.current = window.setTimeout(() => {
            toggleButton(PopoverStatus.Opened);
        }, ANIMATION_DURATION);
    };
    const hideOptions = function (e: React.MouseEvent<HTMLDivElement>) {
        const relatedTarget = e.relatedTarget as HTMLDivElement;
        if (relatedTarget.className && relatedTarget.className.includes(selectorId) && !relatedTarget.className.includes('closing')) {
            return void 0;
        }
        toggleButton(PopoverStatus.Closing);
        clearTimeout(timer.current);
        timer.current = window.setTimeout(() => {
            toggleButton(PopoverStatus.Closed);
        }, ANIMATION_DURATION);
    };

    return <div>
        <div title={props.options[currentSelectIndex]} ref={selectorButtonRef} className={classnames("selector-button", selectorId)} onMouseEnter={showOptions} onMouseLeave={hideOptions}>{props.options[currentSelectIndex]}</div>
        {createPortal(<SelectorPopover selectorId={selectorId} onSelect={onSelect} onMouseLeave={hideOptions} position={popoverPosition} options={props.options} show={isShow} />, selectorPopoverNode.current)}
    </div>
}