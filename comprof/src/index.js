import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux'
import reducer from './store/reducer'
import { Provider } from 'react-redux'
import history from './history'
import {Router, Switch, Route} from 'react-router-dom'
//---------------------------
import BaseLayout from './components/BaseLayout'
import Login from './components/Login'
import HomePage from './components/HomePage'
import Membership from './components/Membership'
import SearchProvider from './components/SearchProvider'
import MainDashboard from './components/MainDashboard'



let store = createStore(reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())


ReactDOM.render(
  <Provider store = {store}>
  <Router history={history}>
  <BaseLayout >

    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/membership" component={Membership} />
      <Route exact path="/search-provider" component={SearchProvider} />
      <Route exact path="/main-dashboard" component={MainDashboard} />
    </Switch>

  </BaseLayout>
  </Router>
  </Provider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
