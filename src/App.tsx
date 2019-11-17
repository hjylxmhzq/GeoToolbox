import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.less';
import './styles/iconfont.css';
import Layout from './components/Layout';
import Menu, { menuTemplate } from './components/Menu';
import FileList from './components/FileList';

const MIN_LEFT_WIDTH = 150;
const MAX_LEFT_WIDTH = 650;
const DEFAULT_LEFT_WIDTH = 300;

interface IAppProps {
}

interface IAppState {
  isResize: boolean;
  leftWidth: number;
}

class App extends Component<IAppProps, IAppState> {

  constructor(props: IAppProps) {
    super(props);
    this.state = {
      isResize: false,
      leftWidth: 300
    }
  }

  onResizeLeftMouseDown(e: MouseEvent) {
    let mouseX = e.clientX;
    if (Math.abs(mouseX - this.state.leftWidth) < 10) {
      this.setState({
        isResize: true,
      })
    }
  }

  onResizeLeftMouseUp(e: MouseEvent) {
    this.setState({
      isResize: false,
    })
  }

  onResizeLeftMouseMove(e: MouseEvent) {
    if (this.state.isResize) {
      const clientX = e.clientX;
      this.setState({
        leftWidth: clientX > MIN_LEFT_WIDTH && clientX < MAX_LEFT_WIDTH ? clientX : clientX < MIN_LEFT_WIDTH ? MIN_LEFT_WIDTH : MAX_LEFT_WIDTH,
      })
    }
  }

  render() {
    return (
      <div
        className='App'
        onMouseDown={this.onResizeLeftMouseDown.bind(this)}
        onMouseUp={this.onResizeLeftMouseUp.bind(this)}
        onMouseMove={this.onResizeLeftMouseMove.bind(this)}
      >
        <Layout
          left={<Menu menu={menuTemplate} />}
          right={<RightPanelRouter />}
          leftWidth={this.state.leftWidth}
        />
      </div>
    )
  }
}

function RightPanelRouter() {
  return (
    <Route path="/filelist">
      <FileList />
    </Route>
  )
}

function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <App />
        </Route>
      </Switch>
    </Router>
  )
}

export default AppRouter;