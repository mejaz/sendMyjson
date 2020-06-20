import React from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Redirect, withRouter, Link } from 'react-router-dom'
import { AlertRed, AlertGreen } from '../Alert/Alert'
import Recaptcha from 'react-recaptcha'
import {registerUser} from '../Utils/api'
// import ReCAPTCHA from "react-google-recaptcha"

function SignUp(props) {
  const [signUp, setSignUp] = React.useState(false)
  const [msg, setMsg] = React.useState(null)
  const [error, setError] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [isVerified, setVerified] = React.useState(false)
  const [captchaResponse, setCaptchaResponse] = React.useState('')

  const email = React.useRef()
  const pass1 = React.useRef()
  const pass2 = React.useRef()
  const captcha = React.useRef()


  React.useEffect(() => {
    resetCaptcha()
  }, [])

  // captcha start
  const resetCaptcha = () => captcha.current.reset()
  const verifyHuman = (response) => {
    if (response) {
      setCaptchaResponse(response)
      setVerified(true)
    }
  }
  // captcha end

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)

    let emailVal = email.current.value
    let pass1Val = pass1.current.value
    let pass2Val = pass2.current.value

    if (pass1Val !== pass2Val) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    // make api call

    let data = {
      email: emailVal,
      password: pass1Val,
      recaptchaToken: captchaResponse,
    }


    let r = await registerUser(data)

    if (r.status === 0) {
        setLoading(false)
        setError(null)
        setSignUp(true)
        email.current.value = ''
        pass1.current.value = ''
        pass2.current.value = ''
        // props.setKey('login')
        resetCaptcha()
        setMsg(`${r.msg}. Please login to continue.`)
        // props.history.push('/login')
      }
    else {
      setLoading(false)
      setError(`${r.msg}`)
      setSignUp(false)
      setMsg(null)
      resetCaptcha()
    }
  }

  return(
    <div className='login-form'>
      <div className='login-reg-bar'>Sign Up</div>
      {error && <AlertRed msg={error} />}
      {msg && <AlertGreen msg={msg} />}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail2">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" ref={email} required />
        </Form.Group>
        <Form.Group controlId="formBasicPassword2">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" ref={pass1} required />
        </Form.Group>
        <Form.Group controlId="formBasicPassword3">
          <Form.Label>Re-Enter Password</Form.Label>
          <Form.Control type="password" placeholder="Re-Enter Password" ref={pass2} required />
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
              <Link to='/login'>Login</Link>
            </span>
          </Col>
        </Row>
        <Button
          variant="primary"
          type="submit"
          disabled={loading}
          >
          {loading ? "Please Wait..." : "Sign Up" }
        </Button>
      </Form>
    </div>
  )
}

export default withRouter(SignUp)
