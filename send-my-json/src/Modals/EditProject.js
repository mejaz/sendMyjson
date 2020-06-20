import React from 'react'
import { Modal, Form, Button } from 'react-bootstrap'

function EditProject(props) {
  const [projectName, setProjectName] = React.useState(props.projectName)
  const pn = React.useRef()

  React.useEffect(() => pn.current.focus(), [])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (projectName !== '') {
      props.updateProject(props.id, projectName)
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
          Edit Project
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Project Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Any name to identify your project"
              ref={pn}
              onChange={(e) => setProjectName(e.target.value)}
              maxLength={50}
              required
              value={projectName}
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

export default EditProject
