import './App.css';
import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './util/theme';
import jwtDecode from 'jwt-decode';
//redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/type';
import { logoutUser, getUserData } from './redux/actions/userActions';
//pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import upload from './pages/Upload';
//components
import Navbar from './components/Navbar';
import AuthRoute from './util/AuthRoute';
import { api } from './axiosConfigs'

const theme = createMuiTheme(themeFile);

//check if token is auth and not expired

const token = localStorage.FBidToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    api.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

function App() {

  return (

    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={home} />
              <AuthRoute exact path="/login" component={login}
              />
              <AuthRoute exact path="/signup" component={signup}
              />
              <Route exact path="/upload" component={upload}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    </MuiThemeProvider>

  );
}

export default App;
