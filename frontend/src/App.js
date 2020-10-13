import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import userPage from './pages/User'
import eventPage from './pages/Events'
import bookingPage from './pages/Bookings'
import Navigation from './components/navigation/navigation'
import AuthContext from './components/authContext'



class App extends Component {
  state = {
    token: null,
    userId: null
  }

  login = (token, userId, tokenExpiration) => {
    this.setState({
      token: token,
      userId: userId
    })
  }

  logout = () => {
    this.setState({
      token: null,
      userId: null
    })
  }
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <AuthContext.Provider value={{
            token: this.state.token,
            userId: this.state.userId,
            login: this.login,
            logout: this.logout
          }}
          >
            <Navigation />
            <main className='main'>
              <Switch>
                {!this.state.token && <Redirect from='/' to='/users' exact />}
                {this.state.token && <Redirect from='/' to='/events' exact />}
                {this.state.token && <Redirect from='/users' to='/events' exact />}

                {!this.state.token && <Route path='/users' component={userPage} />}
                <Route path='/events' component={eventPage} />
                {this.state.token && <Route path='/bookings' component={bookingPage} />}
              </Switch>
            </main>
          </AuthContext.Provider>
        </React.Fragment>
      </BrowserRouter>
    );
  }

}

export default App;
