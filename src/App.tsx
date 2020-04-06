import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Provider, connect } from 'react-redux';
import { createStore, Store } from 'redux';
import './App.less';
import './styles/iconfont.css';
import Layout from './components/Layout';
import Menu, { menuTemplate } from './components/Menu';
import FileList from './rightPanels/FileList';
import Modal from './components/Modal';
import { globalReducer, IStore } from './redux/reducers';
import BaiduLBSIntroduction from './rightPanels/BaiduLBS';

const MIN_LEFT_WIDTH = 150;
const MAX_LEFT_WIDTH = 650;
const DEFAULT_LEFT_WIDTH = 150;

interface IAppProps {
  showModal: boolean;
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
      leftWidth: DEFAULT_LEFT_WIDTH
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
        <Modal></Modal>
      </div>
    )
  }
}

function mapStateToProps(state: IStore) {
  return {
    showModal: state.showModal,
  };
}

function mapDispatchToProps() {
  return {};
}

function RightPanelRouter() {
  return (
    <Switch>
      <Route path="/filelist">
        <FileList />
      </Route>
      <Route path="/baidulbs">
        <BaiduLBSIntroduction />
      </Route>
    </Switch>
  )
}

const store: Store = createStore(globalReducer);
globalThis.reduxStore = store;
const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Provider store={store}>
            <ConnectedApp />
          </Provider>
        </Route>
      </Switch>
    </Router>
  )
}

export default AppRouter;