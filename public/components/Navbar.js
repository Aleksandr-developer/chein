import React from 'react'
import { Link} from 'react-router-dom'

class Navbar extends React.Component {

  handleClick = (e) => {
    let menu = ["progress", "science", "sport", "volunteerism", "achievements"]
    let currentMenu = menu.filter(component => {
      return component !== e.target.id;
    })
     
    e.target.className = "nav-link active"

    for (const name of currentMenu) {
      document.getElementById(name).classList.remove("active");
    }
  }

  render() {
    return (
      <div className="col-4">
        <div className="menu">
          <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
            <button type="button" className="btn btn-primary btn-lg">СОЗДАТЬ ДОСТИЖЕНИЕ</button>
            <Link onClick={this.handleClick} to="/main/progress" className="nav-link" id="progress" data-toggle="pill" role="tab" aria-controls="v-pills-home" aria-selected="false">УСПЕВАЕМОСТЬ</Link>
            <Link onClick={this.handleClick} to="/main/science" className="nav-link" id="science" data-toggle="pill" role="tab" aria-controls="v-pills-home" aria-selected="false">НАУКА</Link>
            <Link onClick={this.handleClick} to="/main/sport" className="nav-link" id="sport" data-toggle="pill" role="tab" aria-controls="v-pills-home" aria-selected="false">СПОРТ</Link>
            <Link onClick={this.handleClick} to="/main/volunteerism" className="nav-link" id="volunteerism" data-toggle="pill" role="tab" aria-controls="v-pills-home" aria-selected="false">ВОЛОНТЁРСТВО</Link>
            <Link onClick={this.handleClick} to="/main/achievements" className="nav-link" id="achievements" data-toggle="pill" role="tab" aria-controls="v-pills-home" aria-selected="false">МОИ ДОСТИЖЕНИЯ</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Navbar;