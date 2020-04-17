import React from 'react';
import Authorization from './Authorization';
import Registration from './Registration';
import MainPage from './MainPage';
import { BrowserRouter, Route } from 'react-router-dom'

class App extends React.Component {
  render() {
    return(
      <BrowserRouter>
        <Route path="/login">
          <Authorization />
        </Route>
        <Route path="/registration">
          <Registration />
        </Route>
        <Route path="/main">
          <MainPage />
        </Route>
      </BrowserRouter>
    )
  }
}

export default App;