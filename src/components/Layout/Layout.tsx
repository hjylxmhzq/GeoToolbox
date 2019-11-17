import React, { Component } from 'react';
import './Layout.less';

interface ILayoutProps {
  leftWidth: number;
  left: React.ReactElement;
  right: React.ReactElement;
}

interface ILayoutState {
}

class Layout extends Component<ILayoutProps, ILayoutState> {

  constructor(props: ILayoutProps) {
    super(props);
    this.state = {
      leftWidth: props.leftWidth,
      isResize: false,
    }
  }

  render() {
    const { leftWidth, left, right } = this.props;
    return (
      <>
        <div
          className="left-container"
          style={{
            width: leftWidth,
          }}
        >
          {left}
        </div>
        <div className="right-container">{right}</div>
      </>
    )
  }
}

export default Layout;