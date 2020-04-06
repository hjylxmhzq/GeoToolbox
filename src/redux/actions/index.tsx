import React from 'react';

export enum ActionType {
    ToggleModal,
};

export interface IAction {
    type: ActionType;
    payload: any;
}

export function ToggleModal(ele: React.ReactElement) {
    const action: IAction = {
        type: ActionType.ToggleModal,
        payload: ele,
    };
    return action;
}