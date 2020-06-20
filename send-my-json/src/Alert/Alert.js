import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import { Alert } from 'react-bootstrap'

export function AlertRed(props) {
    return (
      <Alert variant="danger">
        <span>
          {props.msg}
        </span>
      </Alert>
    )
}

export function AlertGreen(props) {
    return (
      <Alert variant="success">
        <span>
          {props.msg}
        </span>
      </Alert>
    )
}
