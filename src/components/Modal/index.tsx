import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import './Modal.less';
import { IStore } from '@root/redux/reducers';
import { connect } from 'react-redux';

interface IModalProps {
    onOk?: () => void;
    onCancel?: () => void;
    show: boolean;
    content: React.ReactElement;
}

function usePortal() {
    const portalRef = useRef(document.createElement('div'));
    portalRef.current.className = 'modal-mount-node';
    useEffect(function setupPortal() {
        document.body.appendChild(portalRef.current);
        return function unmountPortal() {
            portalRef.current.remove();
        }
    }, []);
    return portalRef.current;
}

function Modal(props: IModalProps) {
    return props.show ? <div className="modal">{props.content}</div> : null;
}

function PortalModal(props: IModalProps) {
    const portalNode = usePortal();
    return createPortal(Modal(props), portalNode);
}

function mapStateToProps(state: IStore) {
    return {
        show: state.showModal,
        content: state.modalContent,
    }
}

export default connect(mapStateToProps)(PortalModal);