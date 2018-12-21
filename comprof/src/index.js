import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux'
import reducer from './store/reducer'
import { Provider } from 'react-redux'
import history from './history'
import {Router, Switch, Route} from 'react-router-dom'
import { PersistGate } from 'redux-persist/lib/integration/react'
//---------------------------
import BaseLayout from './components/BaseLayout'
import Login from './components/Login'
import HomePage from './components/HomePage'
import Membership from './components/Membership'
import SearchProvider from './components/SearchProvider'
import MainDashboard from './components/MainDashboard'
import AddProfile from './components/AddProfile'
import FullProfile from './components/FullProfile'
import Profile from './components/Profile'
import Contact from './components/Contact'
import Mymessages from './components/Mymessages'
import {persistor, store} from './store/configureStore'
import StripeCheckout from './components/StripeCheckout'


ReactDOM.render(
  <Provider store = {store}>
  <PersistGate loading={null} persistor={persistor}>
  <Router history={history}>

  <BaseLayout >

    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/membership" component={Membership} />
      <Route exact path="/search-provider" component={SearchProvider} />
      <Route exact path="/main-dashboard" component={MainDashboard} />
      <Route exact path="/add-profile" component={AddProfile} />
      <Route exact path="/full-profile" component={FullProfile} />
      <Route exact path="/myprofile" component={Profile} />
      <Route exact path="/sendmessage" component={Contact} />
      <Route exact path="/mymessages" component={Mymessages} />
      <Route exact path="/stripecheckout" component={StripeCheckout} />
    </Switch>

  </BaseLayout>

  </Router>
</PersistGate>
  </Provider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
