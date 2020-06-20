import React from 'react'
import { Col, Row, Button, Accordion, Card } from 'react-bootstrap'
import Cookies from 'js-cookie'
import EmptyProject from '../Empty/EmptyProject'
import AddProject from '../Modals/AddProject'
import Project from './Project'
import {
  getUserProjects,
  addUserProject,
  updateUserProject,
  deleteUserProject,
  addProjectApi,
 } from '../Utils/api'

import { ACCESS_TOKEN, REFRESH_TOKEN, BASE_URL } from '../Constants/Constants'

function Projects(props) {
  const [projects, setProjects] = React.useState([])
  const [addProjectFlag, setAddProjectFlag] = React.useState(false)

  React.useEffect(() => {
    async function getProjects() {
      let p = await getUserProjects(Cookies.get(ACCESS_TOKEN))
      setProjects(p)
    }
    getProjects()
  }, [])

  // --- Project Related functions start ---
  const addProject = async (projectName) => {
    let data = {
      "name": projectName.trim()
    }

    let p = await addUserProject(Cookies.get(ACCESS_TOKEN), data)
    if(p.status) {
      alert(p.msg)
    } else {
      setProjects(() => projects.concat(p))
    }
  }

  const updateProject = async (project_id, projectName) => {
    let data = {
      id: project_id,
      name: projectName.trim(),
    }

    let updateIndex = -1

    for (let i = 0; i <projects.length; i++) {
      if (projects[i].id === project_id) {
        updateIndex = i;
        break
      }
    }

    let p = await updateUserProject(Cookies.get(ACCESS_TOKEN), project_id, data)

    if(p.status) {
      alert(p.msg)
    } else {
      let newProjects = [...projects]
      newProjects[updateIndex] = p
      setProjects(newProjects)
    }

  }

  const deleteProject = async (project_id) => {
    let p = await deleteUserProject(Cookies.get(ACCESS_TOKEN), project_id)

    let deleteIndex = -1

    for (let i = 0; i <projects.length; i++) {
      if (projects[i].id === project_id) {
        deleteIndex = i;
        break
      }
    }

    if (p.status) {
      alert(p.msg)
    } else {
      let newProjects = [...projects]
      newProjects.splice(deleteIndex, 1)
      setProjects(newProjects)
    }
  }


  // ----- api related functions here -----

  const addApi = async (project_id, data) => {
    let newApi = await addProjectApi(
      Cookies.get(ACCESS_TOKEN),
      project_id,
      data
    )

    if (newApi.status) {
      alert(newApi.msg)
    } else {

      // from projects identify the project index
      let projectIndex = -1

      for (let i = 0; i <projects.length; i++) {
        if (projects[i].id === project_id) {
          projectIndex = i;
          break
        }
      }

      console.log('-- proj index --', projectIndex)

      // in the api list of project, add the newly created api
      let newProjectList = [...projects]

      console.log('-- proj copy b4 --', newProjectList)

      newProjectList[projectIndex].apis.push(newApi)

      console.log('-- proj copy after --', newProjectList)

      setProjects(newProjectList)

    }
  }


  return (
    <div className='project-pane'>
      <div className='project-pane-header-bar'>
        <span className='project-pane-header'>Projects</span>
        <Button onClick={() => setAddProjectFlag(true)}>Add Project</Button>
      </div>
      <div className='project-section'>
        {
          projects.length > 0
            ? projects.map((p, i) => (
              <Accordion defaultActiveKey="0" key={i}>
                <Project
                  project={p}
                  getActiveApi={props.getActiveApi}
                  updateProject={updateProject}
                  deleteProject={deleteProject}
                  addApi={addApi}
                />
              </Accordion>
            ))
            : <EmptyProject />
        }
      </div>
      {
        addProjectFlag &&
        <AddProject
          // closeModal={closeAddProject}
          show={addProjectFlag}
          onHide={() => setAddProjectFlag(false)}
          addProject={addProject}
        />
      }
    </div>
  )
}

export default Projects
