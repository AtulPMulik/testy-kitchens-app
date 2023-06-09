import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
    isShowingError: false,
    errorMsg: '',
  }

  onSuccessfulLogin = jwtToken => {
    const {history} = this.props
    if (jwtToken !== undefined) {
      Cookies.set('jwt_token', jwtToken, {expires: 30})
      history.replace('/')
    }
  }

  onLoginFailure = errorMessage => {
    this.setState({isShowingError: true, errorMsg: errorMessage})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    // console.log(response)
    const data = await response.json()
    // console.log(data)
    if (response.ok === true) {
      this.onSuccessfulLogin(data.jwt_token)
    } else {
      this.onLoginFailure(data.error_msg)
    }
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeShowPassword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  render() {
    const {
      showPassword,
      isShowingError,
      errorMsg,
      username,
      password,
    } = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-page">
        <div className="card-container">
          <div className="card">
            <form className="form" onSubmit={this.onSubmitForm}>
              <h1 className="welcome"> Welcome </h1>
              <div className="logo-container">
                <img
                  alt="website logo"
                  className="website-logo"
                  src="https://res.cloudinary.com/djr2g813p/image/upload/v1684482099/Frame_274_elgwxc.jpg"
                />
                <div>
                  <h1 className="website-heading"> Tasty Kitchens </h1>
                  <p className="tagline"> So Quick, So Classy & So Good </p>
                </div>
              </div>
              <h1 className="login-heading">
                <span className="login-span-heading">Login</span> Your Account
              </h1>
              <div className="input-container">
                <label className="label" htmlFor="userInput">
                  USERNAME
                </label>
                <input
                  value={username}
                  className="input"
                  type="text"
                  id="userInput"
                  autoComplete="off"
                  onChange={this.onChangeUserName}
                  placeholder="User Name"
                />
              </div>
              <div className="input-container">
                <label className="label" htmlFor="userPassword">
                  PASSWORD
                </label>
                <input
                  value={password}
                  className="input"
                  type={showPassword ? 'text' : 'password'}
                  id="userPassword"
                  onChange={this.onChangePassword}
                  placeholder="Password"
                />
              </div>
              <div className="checkbox-container">
                <label className="checkbox-label" htmlFor="checkbox">
                  Show Password
                </label>
                <input
                  className="checkbox-input"
                  type="checkbox"
                  id="checkbox"
                  onChange={this.onChangeShowPassword}
                />
              </div>
              <button className="login-btn" type="submit">
                Login
              </button>
              {isShowingError && (
                <div className="error-container">
                  <p className="error-paragraph"> {errorMsg} </p>
                </div>
              )}
            </form>
          </div>
        </div>
        <div className="img-container">
          <img
            alt="website login"
            className="login-lg-img"
            src="https://res.cloudinary.com/djr2g813p/image/upload/v1684482420/Rectangle_1456_wrq3ue.jpg"
          />
          <img
            alt="website sm login"
            className="login-sm-img"
            src="https://res.cloudinary.com/djr2g813p/image/upload/v1685163577/Rectangle_1457_zexloa.jpg"
          />
        </div>
      </div>
    )
  }
}

export default Login
