import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Main from './Main'
import Home from './Home'
import SignUp from './SignUp/SignUp'
import './App.css'


function App() {
  return (
    <Container fluid>
      <Switch>
        <Route exact path='/' component={Main}/>
        <Route exact path='/login' component={Main}/>
        <Route exact path='/signUp' component={Main}/>
        <Route path='/:id/home' component={Home}/>
      </Switch>
    </Container>
  );
}

export default App
