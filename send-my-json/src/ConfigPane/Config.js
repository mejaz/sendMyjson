import React from 'react'
import EmptyConfig from '../Empty/EmptyConfig'
import Api from './Api'

function Config(props) {
  return (
    <div className='config-pane'>
        {
          props.api !== null
            ? <div className='api-config'>
                <Api />
              </div>
            : <EmptyConfig />
        }
    </div>
  )
}

export default Config
