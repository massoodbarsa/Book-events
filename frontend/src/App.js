import React from 'react';
import './App.css';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import userPage from './pages/User'
import eventPage from './pages/Events'
import bookingPage from './pages/Bookings'
import Navigation from './components/navigation/navigation'



function App() {
  return (
    <BrowserRouter>
    <React.Fragment>
      <Navigation />
      <Switch>
        <Redirect from='/' to='/users' exact />
        <Route path='/users' component={userPage} />
        <Route path='/events' component={eventPage} />
        <Route path='/bookings' component={bookingPage} />
      </Switch>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
