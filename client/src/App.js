import './App.css';
import React, { Fragment, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import { Landing } from './components/layout/Landing';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';

//redux

import { Provider } from 'react-redux'; //it connects react with redux
import store from './store';
//import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';

// if (localStorage.token) {
//   setAuthToken(localStorage.token);
// }

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />

          <section className='container'>
            <Alert />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
