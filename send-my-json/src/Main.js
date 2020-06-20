import React from 'react'
import { Route, withRouter, Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import Login from './Login/Login'
import SignUp from './SignUp/SignUp'

function Main(props) {
  const [key, setKey] = React.useState('login');
  return(
    <>
      <Row>
        <div className='header-section'>
          <span className='header-text'>SendMyJson.Com</span>
        </div>
      </Row>
      <Row>
        <Col md={{offset: 2, span: 8}}>
          <div className='login-section'>
            {console.log(props)}
            {props.location.pathname === '/login' || props.location.pathname === '/'
              ? <Login />
              : <SignUp />
            }
          </div>
        </Col>
      </Row>
    </>
  )
}

export default withRouter(Main)
