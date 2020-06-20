import React from 'react'
import { Link, Route, Redirect, withRouter } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Cookies from 'js-cookie'
import { AlertRed } from '../Alert/Alert'
import Recaptcha from 'react-recaptcha'
import { loginUser } from '../Utils/api'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../Constants/Constants'
import jwt_decode from 'jwt-decode'
// import SignUp from '../SignUp/SignUp'
// import ReCAPTCHA from "react-google-recaptcha"

function Login(props) {
  const [login, setLogin] = React.useState(false)
  const [error, setError] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [isVerified, setVerified] = React.useState(false)
  // const [userid, setUserId] = React.useState(null)

  const email = React.useRef()
  const password = React.useRef()
  const captcha = React.useRef()

  React.useEffect(() => {
    resetCaptcha()
  }, [])

  // captcha start
  const resetCaptcha = () => captcha.current.reset()
  const onloadCallback = () => console.log('*** loaded ***')
  const verifyHuman = (response) => {
    if (response) {
      console.log(response)
      setVerified(true)
    }
  }
  // captcha end

  // on submit
  const handleSubmit = async (e) => {
    e.preventDefault()


    if (isVerified === false) {
      setError('Please verify you are human.')
      return
    }

    setLoading(true)

    let emailVal = email.current.value
    let passwordVal = password.current.value

    let data = {
      'username': emailVal,
      'password': passwordVal,
    }

    let loginUserObj = await loginUser(data)

    if (loginUserObj.access) {

      Cookies.set(ACCESS_TOKEN, loginUserObj.access)
      Cookies.set(REFRESH_TOKEN, loginUserObj.refresh)

      let jwt_access_decoded = jwt_decode(loginUserObj.access)

      let userid = jwt_access_decoded.user_id

      if (userid !== null) {
        setError(null)
        setLogin(true)
        setLoading(false)
        resetCaptcha()
        props.history.push(`/${userid}/home`)
      }

    } else {
      setError("Username or Password is incorrect.")
      setLoading(false)
      resetCaptcha()
    }
  }

  return(
    <div className='login-form'>
      <div className='login-reg-bar'>Login</div>
      {error && <AlertRed msg={error} />}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail1">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" ref={email} required />
        </Form.Group>
        <Form.Group controlId="formBasicPassword1">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" ref={password} required />
        </Form.Group>
        <Row className='captcha-bar'>
          <Col md={8}>
            <Recaptcha
              ref={captcha}
              render="explicit"
              sitekey="6LdsXwAVAAAAAOnkMsM9AEa8VUiigwL-ulF4-Yzk"
              verifyCallback={verifyHuman}
            />
          </Col>
          <Col md={4} className='register-bar'>
            <span className='forgot-password'>
              <Link to='/signUp'>Register</Link>
            </span>
            <span className='forgot-password'>
              <Link to='/'>Forgot Password</Link>
            </span>
          </Col>
        </Row>
        <Button
          variant="primary"
          type="submit"
          disabled={loading}
          >
          {loading ? "Please Wait..." : "Login" }
        </Button>
      </Form>
    </div>
  )
}

export default withRouter(Login)
