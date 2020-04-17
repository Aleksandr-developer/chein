import React from 'react';
import Navbar from './components/Navbar'
import Progress from './components/Progress'
import Science from './components/Science'
import Sport from './components/Sport';
import Volunteerism from './components/Volunteerism';
import Achievements from './components/Achievements';
import { BrowserRouter, Route } from 'react-router-dom'
import './MainPage.css';

class MainPage extends React.Component {
  render() {
    return (
        <main className="MainPage">
          <BrowserRouter>
            <div className="row no-gutters">
              <Navbar />
              <Route path='/main/progress' component={Progress} />
              <Route path='/main/science' component={Science} />
              <Route path='/main/sport' component={Sport} />
              <Route path='/main/volunteerism' component={Volunteerism} />
              <Route path='/main/achievements' component={Achievements} />
            </div>
          </BrowserRouter>
        </main>
    );
  }
}

export default MainPage;
