import React from 'react';
import './Authorization.css';
import { Link } from 'react-router-dom';

class Authorization extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      login: null,
      password: null,
      errors: {
        loginError: '',
        passwordError: ''
      }
    };
  }

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let errors = this.state.errors;

    if (name === 'login') {
      let patternLogin = /^[a-zA-Z]{6,15}$/;
      let outputLogin = patternLogin.test(value);

      errors.loginError = !outputLogin ? 'Логин должен содержать только латинские буквы, длина от 6 до 15 символов!' : '';
    }
    else {
      let patternPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[_])[A-Za-z\d_]{6,15}$/;
      let outputPassword = patternPassword.test(value);

      errors.passwordError = !outputPassword ? 'Пароль должен содержать латинские буквы, минимум одну цифру и минимум один специальный символ "_", длина от 6 до 15 символов!' : '';
    }

    this.setState({
      [name]: value,
      errors
    });
}

handleClick = e => {
  e.preventDefault();
  let { login, password, errors } = this.state;

  if (login === null)
    errors.loginError = "Required!";

  if (password === null)
    errors.passwordError = "Required!";

  this.setState({
    errors
  })
  
  /*
  Ниже нужно реализовать отправку данных на сервер и их обработку
  */
 
 if ((errors.loginError.length === 0 && errors.passwordError.length === 0))
    console.log("True");
  else
    console.log("False");
}


  render() {
    let errors = this.state.errors;
    return (
        <main className="Authorization">
          <div>
            <h2><strong>АВТОРИЗАЦИЯ</strong></h2>
            <form>
              <div className="form-group row">
                  <label htmlFor="inputLogin" className="col-sm-2 col-form-label">Логин</label>
                  <div className="col-sm-10">
                    <input onChange={this.handleChange} name="login" type="text" className="form-control" id="inputLogin" placeholder="Логин" />
                    {errors.loginError.length > 0 && 
                    <span className='error'>{errors.loginError}</span>}
                  </div>
              </div>
              <div className="form-group row">
                  <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Пароль</label>
                  <div className="col-sm-10">
                  <input onChange={this.handleChange} name="password" type="password" className="form-control" id="inputPassword" placeholder="Пароль"/>
                    {errors.passwordError.length > 0 && 
                    <span className='error'>{errors.passwordError}</span>}
                  </div>
                </div>
            </form>
            <div className="button">
                <button onClick={this.handleClick} type="button" className="btn btn-primary btn-lg btn-block enter">Вход</button>
                <Link to="/main" type="button" className="btn btn-primary btn-lg btn-block guest">Гость</Link>
            </div>
            <Link to="/registration">Зарегистрироваться</Link>
          </div>
        </main>
    );
  }
}

export default Authorization;