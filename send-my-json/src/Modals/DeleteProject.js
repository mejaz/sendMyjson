import React from 'react'
import { Modal, Button } from 'react-bootstrap'


function DeleteProject(props) {

  const deleteProject = () => {
    console.log('--id--', props.id)
    props.deleteProject(props.id)
    props.onHide()
  }

  return (
    <Modal show={props.show} onHide={props.onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete {props.projectName}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={() => deleteProject()}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
  )
}


export default DeleteProject
