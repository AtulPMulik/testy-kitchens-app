import {Component} from 'react'

import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Counter extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
    isShowingError: false,
    errorMsg: '',
  }

  onSuccessfulLogin = jwtToken => {
    if (jwtToken !== undefined) {
      Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
      const {history} = this.props
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

  onClickShowPassword = () => {
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
              <div className="logo-container">
                <img
                  className="website-logo"
                  src="https://res.cloudinary.com/djr2g813p/image/upload/v1684482099/Frame_274_elgwxc.jpg"
                  alt="website logo"
                />
                <h1 className="website-heading"> Tasty Kitchens </h1>
              </div>
              <h1 className="login-heading"> Login </h1>
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
                />
              </div>
              <div className="input-container">
                <label className="label" htmlFor="password">
                  PASSWORD
                </label>
                <input
                  value={password}
                  className="input"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  onChange={this.onChangePassword}
                />
              </div>
              <div className="checkbox-container">
                <label className="checkbox-label" htmlFor="checkbox">
                  Show Password
                </label>
                <input
                  className="checkbox"
                  type="checkbox"
                  id="checkbox"
                  onClick={this.onClickShowPassword}
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
            className="login-lg-img"
            src="https://res.cloudinary.com/djr2g813p/image/upload/v1684482420/Rectangle_1456_wrq3ue.jpg"
            alt="website login"
          />
          <img
            className="login-sm-img"
            src="https://res.cloudinary.com/djr2g813p/image/upload/v1685163577/Rectangle_1457_zexloa.jpg"
            alt="website login"
          />
        </div>
      </div>
    )
  }
}

export default Counter
