import React, { Component, useEffect, useState } from 'react';
import classnames from 'classnames';
import { ICoord } from './option';

export enum ToolbarButton {
    none = 0,
    polygon = 1,
}

interface IToolbarProps {
    onSelect: (buttonIndex: ToolbarButton) => void;
    selectedButton: ToolbarButton;
    coords: ICoord[];
}

export default class MapToolbar extends Component<IToolbarProps> {
    constructor(props: IToolbarProps) {
        super(props);
    }

    render() {
        console.log(this.props.coords)
        return (
            <div className="map-toolbar">
                <div
                    className={classnames("map-toolbar-button", { 'selected': this.props.selectedButton == ToolbarButton.polygon })}
                    onClick={() => this.props.onSelect(ToolbarButton.polygon)}>
                    <svg width="32" height="24">
                        <g>
                            <title>多边形</title>
                            <rect id="svg_2" height="15.54253" width="23.42642" y="4.40454" x="4.34474" stroke="#000000" fill="#eaeaea" />
                        </g>
                    </svg>
                </div>
                {this.props.coords.length ? <div className="map-toolbar-coords">
                    {
                        this.props.coords.map((coords: ICoord, index: number) => 
                        <div key={index}>
                            <div>feature: {index + 1}</div>
                            {
                                coords.map((coord, index) => {
                                    return  <div title={coord.toString()} className="map-toolbar-coords-item" key={coord.toString() + index}>lng:{coord[0]} lat:{coord[1]}</div>
                                })
                            }
                        </div>
                        )
                    }
                </div>
                    : ''
                }
            </div>
        )
    }
}