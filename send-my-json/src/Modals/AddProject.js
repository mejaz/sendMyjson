import React from 'react'
import { Modal, Form, Button } from 'react-bootstrap'

function AddProject(props) {

  const projName = React.useRef()

  React.useEffect(() => projName.current.focus(), [])

  const handleSubmit = (e) => {
    e.preventDefault()

    let name = projName.current.value

    if (name !== '') {
      props.addProject(name)
      props.onHide()
    } else {
      alert('Project name is required.')
    }
  }

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Project
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Enter a Project Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Any name to identify your project"
              ref={projName}
              maxLength={50}
              autoFocus={true}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default AddProject
