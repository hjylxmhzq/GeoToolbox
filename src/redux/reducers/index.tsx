import { ActionType, IAction } from '../actions'
import React from 'react';

export interface IStore {
    showModal: boolean;
    modalContent: React.ReactElement;
}

const initState: IStore = {
    showModal: false,
    modalContent: <div>加载中</div>,
}

export function globalReducer(state = initState, action: IAction) {
    switch (action.type) {
        case ActionType.ToggleModal: return { ...state, showModal: !state.showModal, modalContent: action.payload };
        default: return state;
    }
}