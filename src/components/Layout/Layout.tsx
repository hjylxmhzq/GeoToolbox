import React, { Component } from 'react';
import './Layout.less';

interface ILayoutProps {
  leftWidth: number;
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
    const { leftWidth: minLeftWidth } = this.props;
    return (
      <>
        <div
          className="left-container"
          style={{
            width: this.props.leftWidth,
          }}
        >
          left
        </div>
        <div className="right-container">right</div>
      </>
    )
  }
}

export default Layout;