import React from 'react';
import './Registration.css';
import { Link } from 'react-router-dom';

class Registration extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: null,
      surname: null,
      middlename: null,
      email: null,
      password: null,
      direction: null,
      confirmPassword: null,
      course: null,
      isValid: null,
      errors: {
        nameError: '',
        surnameError: '',
        middlenameError: '',
        emailError: '',
        passwordError: '',
        directionError: '',
        confirmPasswordError: '',
        courseError: ''
      }
    };
  }

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log(name, value)
    let errors = this.state.errors;
    
    switch(name) {
      case 'name': {
        this.state.name = value

        let patternName = /^[A-Za-z]{4,20}$/;
        let outputLogin = patternName.test(value);

        errors.nameError = !outputLogin ? "Латиница, длина от 4 до 20 символов" : "";
        break;     
      }
      case 'surname': {
        this.state.surname = value
      
        let patternSurname = /^[A-Za-z-]{4,20}$/;
        let outputSurname = patternSurname.test(value);
        
        errors.surnameError = !outputSurname ? "Латиница и дефис, длина от 4 до 20 символов" : "";
        break;     
      }
      case 'middlename': {
        this.state.middlename = value

        let patternMiddlename = /^[A-Za-z]{4,20}$/;
        let outputMiddlename = patternMiddlename.test(value);

        errors.middlenameError = !outputMiddlename ? "Латиница, длина от 4 до 20 символов" : "";
        break;     
      }
      case 'email': {
        this.state.email = value

        let patternEmail = /^[0-9a-z-_]+@[0-9a-z]{2,}\.[a-z]{2,4}$/i;
        let outputEmail = patternEmail.test(value);

        errors.emailError = !outputEmail ? "Неверная почта" : "";
        break;     
      }
      case 'password': {
        this.state.password = value

        let patternPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[_])[A-Za-z\d_]{6,15}$/;
        let outputPassword = patternPassword.test(value);

        errors.confirmPasswordError = value !== this.state.confirmPassword ? "Пароли должны совпадать!" : "";
        errors.passwordError = !outputPassword ? "Латиница, одна цифра и один спец. символ '_', длина от 6 до 15 символов!" : "";
        
        break;     
      }
      case 'direction': {
        this.state.direction = value

        let patternDirection = /^\d\d.0\d.0\d$/;
        let outputDirection = patternDirection.test(value);

        errors.directionError = !outputDirection ? "Направление должно быть вида **.0*.0*" : "";
        break;     
      }
      case 'confirmPassword': {
        this.state.confirmPassword = value

        errors.confirmPasswordError = value !== this.state.password ? "Пароли должны совпадать!" : "";
        break;     
      }
      case 'course': {
        this.state.course = value

        let patternCourse = /^[1-5]$/;
        let outputCourse = patternCourse.test(value);

        errors.courseError = !outputCourse ? "Введите корректное значений!" : "";
        break;     
      }
      
      default:
        break;
    }
    
    this.setState({
      [name]: value,
      errors
    });

    let isThereAnError = Boolean(errors.nameError) || Boolean(errors.surnameError) || Boolean(errors.middlenameError) || Boolean(errors.emailError)
    || Boolean(errors.passwordError) || Boolean(errors.confirmPasswordError) || Boolean(errors.courseError) || Boolean(errors.directionError)

    let isValueEmpty = Boolean(this.state.name) && Boolean(this.state.surname) && Boolean(this.state.middlename) && Boolean(this.state.email)
    && Boolean(this.state.password) && Boolean(this.state.confirmPassword) && Boolean(this.state.course) && Boolean(this.state.direction)

    console.log(this.state.isValid)

    if (!isThereAnError && isValueEmpty)
    {
      this.setState({
        isValid: true
      })
    }
    else
    {
      this.setState({
        isValid: false
      })
    }
  }

  handleClick = e => {
    e.preventDefault();
    let {name, surname, middlename, email, password, direction, confirmPassword, course, errors} = this.state;
    let isEmptyName = name === null;
    let isEmptySurname = surname === null;
    let isEmptyMiddlename = middlename === null;
    let isEmptyEmail = email === null;
    let isEmptyPassword = password === null;
    let isEmptyDirection = direction === null;
    let isEmptyConfirmPassword = confirmPassword === null;
    let isEmptyCourse = course === null;

    let isEmptyList = [isEmptyName, isEmptySurname, isEmptyMiddlename, isEmptyEmail, isEmptyPassword, isEmptyDirection, isEmptyConfirmPassword, isEmptyCourse];
    let errorsList = ["nameError", "surnameError", "middlenameError", "emailError", "passwordError", "directionError", "confirmPasswordError", "courseError"]

    for (let i = 0; i < isEmptyList.length; i++)
      if (isEmptyList[i])
        errors[errorsList[i]] = 'Required!';

    console.log("Yes")
    
    this.setState({
      errors
    })
  }

  render() {
    let errors = this.state.errors;
    return (
      <main className="Registration">
        <div>
          <header>
              <div><strong>Создать аккаунт</strong></div>
          </header>
          <aside>
            <form>
              <div className="row">
                <div className="col-6 inputWithIcon">
                  <label htmlFor="Name">Имя:</label>
                  <input type="text" placeholder="Your name" name="name" id="Name" onChange={this.handleChange}/>
                  <i className="fa fa-user fa-lg" aria-hidden="true"></i>
                  {errors.nameError.length > 0 && 
                  <span className='error'>{errors.nameError}</span>}
                </div>
                <div className="col-6 inputWithIcon">
                  <label htmlFor="SurName">Фамилия:</label>
                  <input type="text" placeholder="Your surname" name="surname" id="SurName" onChange={this.handleChange}/>
                  <i className="fa fa-user fa-lg" aria-hidden="true"></i>
                  {errors.surnameError.length > 0 && 
                  <span className='error'>{errors.surnameError}</span>}
                </div>
              </div>

               <div className="row">
                <div className="col-6 inputWithIcon">
                  <label htmlFor="MiddleName">Отчество:</label>
                  <input type="text" placeholder="Your middlename" name="middlename" id="MiddleName" onChange={this.handleChange}/>
                  <i className="fa fa-user fa-lg" aria-hidden="true"></i>
                  {errors.middlenameError.length > 0 && 
                  <span className='error'>{errors.middlenameError}</span>}
                </div>
                <div className="col-6 inputWithIcon">
                  <label htmlFor="Email">Email:</label>
                  <input type="text" placeholder="Your email" name="email" id="Email" onChange={this.handleChange}/>
                  <i className="fa fa-at fa-lg" aria-hidden="true"></i>
                  {errors.emailError.length > 0 && 
                  <span className='error'>{errors.emailError}</span>}
                </div>
              </div>
              <div className="row">
                <div className="col-6 inputWithIcon">
                  <label htmlFor="Password">Пароль:</label>
                  <input type="password" placeholder="Your password" name="password" id="Password" onChange={this.handleChange}/>
                  <i className="fa fa-unlock-alt fa-lg" aria-hidden="true"></i>
                  {errors.passwordError.length > 0 && 
                  <span className='error'>{errors.passwordError}</span>}
                </div>
                <div className="col-6 inputWithIcon">
                  <label htmlFor="Direction">Направление:</label>
                  <input type="text" placeholder="Your direction" name="direction" id="Direction" onChange={this.handleChange}/>
                  <i className="fa fa-compass fa-lg" aria-hidden="true"></i>
                  {errors.directionError.length > 0 && 
                  <span className='error'>{errors.directionError}</span>}
                </div>
              </div>
              <div className="row">
                <div className="col-6 inputWithIcon">
                  <label htmlFor="PasswordAgain">Подтвердите пароль:</label>
                  <input type="password" placeholder="Confirm the password" name="confirmPassword" id="PasswordAgain" onChange={this.handleChange}/>
                  <i className="fa fa-unlock-alt fa-lg" aria-hidden="true"></i>
                  {errors.confirmPasswordError.length > 0 && 
                  <span className='error'>{errors.confirmPasswordError}</span>}
                </div>
                <div className="col-6 inputWithIcon">
                  <label htmlFor="Course">Курс:</label>
                  <input type="text" placeholder="Your course" name="course" id="Course" onChange={this.handleChange}/>
                  <i className="fa fa-list-ol fa-lg" aria-hidden="true"></i>
                  {errors.courseError.length > 0 && 
                  <span className='error'>{errors.courseError}</span>}
                </div>
              </div>
               <div className="col-6 offset-3 but">
                {this.state.isValid ? <Link to="/login" type="button" className="btn btn-primary btn-lg btn-block guest" id="button">Создать</Link> 
                : <button onClick={this.handleClick} type="button" className="btn btn-primary btn-lg btn-block guest" id="button">Создать</button>}
              </div>
            </form>
          </aside>
        </div>
      </main>
    );
  }
}

export default Registration;
