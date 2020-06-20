import React from 'react'
import { Modal, Form, Button, Col } from 'react-bootstrap'

function AddAPI(props) {

  const httpProtocols = [
    'GET',
    'POST',
    'PUT',
    'DELETE',
    'PATCH',
  ]

  const apiName = React.useRef()
  const [method, setMethod] = React.useState(httpProtocols[0])
  const [endpoint, setEndpoint] = React.useState('https://www.sendmyjson.com/')
  const [resource, setResource] = React.useState('')
  const [parameters, setParameters] = React.useState('')

  const getApi = () => {
    let api = `${endpoint}${resource}${parameters}`
    return api
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    let data = {
      name: apiName.current.value.trim(),
      method: method.trim(),
      endpoint: endpoint.trim(),
      resource: resource.trim(),
      parameters: parameters.trim(),
    }
    props.addProjectApi(props.id, data)
    props.onHide()  
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
        <Modal.Title id="contained-modal-title">
          Add API
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Row>
            <Col md={2}>
              <Form.Label>API Name</Form.Label>
            </Col>
            <Col md={10}>
              <Form.Control
                type="text"
                ref={apiName}
                placeholder="Please enter a name of your choice, e.g. GetBookList v1.2"
                required
              />
            </Col>
          </Form.Row>
          <hr />
          <Form.Row>
            <Col md={2}>
              <Form.Label>Method</Form.Label>
              <Form.Control as="select"
                onChange={(e) => setMethod(e.target.value)}>
                {httpProtocols.map((m, i) => <option key={i}>{m}</option>)}
              </Form.Control>
            </Col>
            <Col md={5}>
              <Form.Label>Endpoint</Form.Label>
              <Form.Control
                type="text"
                value={endpoint}
                disabled
              />
            </Col>
            <Col md={3}>
              <Form.Label>Resource</Form.Label>
              <Form.Control
                type="text"
                placeholder="Resource"
                onChange={(e) => setResource(e.target.value)}
                required
              />
            </Col>
            <Col md={2}>
              <Form.Label>Parameters</Form.Label>
              <Form.Control
                type="text"
                placeholder="Parameters"
                onChange={(e) => setParameters(e.target.value)}
              />
            </Col>
          </Form.Row>
          <hr />
          <Form.Row>
            <Col md={1}>
              <Form.Label>API:</Form.Label>
            </Col>
            <Col md={11}>
              <Form.Control
                type="text"
                value={getApi()}
                className='api-name-text'
                disabled
              />
            </Col>
          </Form.Row>
          <hr />
          <Form.Row>
            <Col>
              <div className='expected-json-header'>
                <Form.Label>Expected JSON Response</Form.Label>
                <div >
                  <span className='fake-button'>Add dummy JSON</span>
                  <span className='fake-button'>Verify JSON</span>
                </div>
              </div>
              <Form.Control
                as="textarea"
                rows="5"
                className='api-json-response'
                placeholder="Paste your response here..."
              />
            </Col>
          </Form.Row>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default AddAPI
