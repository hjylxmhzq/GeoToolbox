import { ToggleModal } from "../actions";
import React from 'react';

export function toggleModal(ele: React.ReactElement) {
    globalThis.reduxStore.dispatch(ToggleModal(ele));
}