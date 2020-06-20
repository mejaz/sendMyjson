import React from 'react'
import { Accordion, Card, ListGroup } from 'react-bootstrap'
import { FaTrash, FaPen, FaPencilAlt, FaTrashAlt } from 'react-icons/fa'
import AddAPI from '../Modals/AddAPI'
import EditProject from '../Modals/EditProject'
import DeleteProject from '../Modals/DeleteProject'



function Project(props) {

  const [addApiFlag, setAddApiFlag] = React.useState(false)
  const [editModalFlag, setEditModalFlag] = React.useState(false)
  const [deleteModalFlag, setDeleteModalFlag] = React.useState(false)
  // const [endpoints, setEndpoint] = React.useState([])


  const selectApi = (e) => props.getActiveApi(e)

  const editProject = (e) => {
    e.stopPropagation()
    setEditModalFlag(true)
  }

  const deleteProject = (e) => {
    e.stopPropagation()
    setDeleteModalFlag(true)
  }

  const addProjectApi = async (project_id, data) => {
    props.addApi(project_id, data)
  }

  const editApi = (e) => e.stopPropagation()

  const deleteApi = (e) => e.stopPropagation()

  return (
    <Card>
      <Accordion.Toggle as={Card.Header}
        eventKey={props.project.id}
        className="project-header"
        >
        <span>{props.project.name}</span>
        <div>
          <button className="flat-button" onClick={editProject}>
            <FaPen size={20}/>
          </button>
          <button className="flat-button" onClick={deleteProject}>
            <FaTrash size={20}/>
          </button>
        </div>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={props.project.id}>
        <Card.Body>
          <ListGroup as="ul">
            {
              props.project.apis.length > 0
                ? <div className='list-api-header'>
                    <span className='apis-header'>
                      List of APIs -
                    </span>
                    <span
                      className='add-api'
                      onClick={() => setAddApiFlag(true)}
                      >Add</span>
                  </div>
                : <div className='list-empty-api-header'>
                    <span
                      className='add-api'
                      onClick={() => setAddApiFlag(true)}
                      >Add</span>
                  </div>
            }
            {
              props.project.apis.length > 0
              ? props.project.apis.map((epnt, i) => (
                <ListGroup.Item as="li"
                  key={i}
                  onClick={() => selectApi(epnt)}>
                  <div className='api-header'>
                    <span>{epnt.name}</span>
                    {/* <div>
                      <button className="flat-button" onClick={editApi}>
                        <FaPencilAlt size={15}/>
                      </button>
                      <button className="flat-button" onClick={deleteApi}>
                        <FaTrashAlt size={15}/>
                      </button>
                    </div> */}
                  </div>
                </ListGroup.Item>
              ))
              : <div>No API configured.</div>
            }
          </ListGroup>
        </Card.Body>
      </Accordion.Collapse>
      {addApiFlag &&
        <AddAPI
          id={props.project.id}
          onHide={() => setAddApiFlag(false)}
          show={addApiFlag}
          addProjectApi={addProjectApi}
        />}
        {editModalFlag &&
          <EditProject
            updateProject={props.updateProject}
            onHide={() => setEditModalFlag(false)}
            show={editModalFlag}
            projectName={props.project.name}
            id={props.project.id}
        />}
        {deleteModalFlag &&
          <DeleteProject
            deleteProject={props.deleteProject}
            onHide={() => setDeleteModalFlag(false)}
            show={deleteModalFlag}
            projectName={props.project.name}
            id={props.project.id}
          />}
    </Card>
  )
}

export default Project
