import React from 'react'
import { Link, Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'
import Cookies from 'js-cookie'
import Projects from './ProjectsPane/Projects'
import Config from './ConfigPane/Config'
import { ACCESS_TOKEN, REFRESH_TOKEN, BASE_URL } from './Constants/Constants'
import { refresh, getUserProfile, getUserProjects } from './Utils/api'

function Home(props) {
  const [api, setApi] = React.useState(null)
  const [user, setUser] = React.useState('Anonymous')
  // const [projects, setProjects] = React.useState([])
  // const [logoutFlag, setLogoutFlag] = React.useState(false)

  React.useEffect(() => {
    async function getUser() {
      let u = await getUserProfile(Cookies.get(ACCESS_TOKEN))

      if (u.name) {
        // let p = await getUserProjects(Cookies.get(ACCESS_TOKEN))
        setUser(u.name)
        // setProjects(p.list)
      } else {
        logout()
      }
    }

    getUser()
  }, [])

  const logout = () => {
    Cookies.remove(ACCESS_TOKEN)
    Cookies.remove(REFRESH_TOKEN)
    return props.history.push('/login')
  }

  const getActiveApi = (e) => setApi(e)

  return (
    <React.Fragment>
      <Row>
        <div className='home-header'>
          <span className='home-header-text'>SendMyJson.Com</span>
          <div>
            <span className='user'>{user}</span>
            <span className='logout' onClick={logout}>Logout</span>
          </div>
        </div>
      </Row>
      <Row>
        <Col md={6}>
          <Projects
            getActiveApi={getActiveApi}
            // projects={projects}
          />
        </Col>
        <Col md={6}>
          <Config api={api}/>
        </Col>
      </Row>
    </React.Fragment>
  )
}


export default withRouter(Home)
