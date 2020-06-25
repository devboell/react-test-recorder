import React from 'react'
import pt from 'prop-types'

import './index.css'

const RecordingPanel = ({
  isRecording,
  stopRecording,
  filePath,
  setFilePath,
  description,
  setDescription,
  children,
}) => {
  return (
    <>
      <div className="recorder-container">
        {isRecording ? (
          <>
            <label>
              File path:
              <input
                type="text"
                value={filePath}
                onChange={(event) => setFilePath(event.target.value)}
              />
            </label>
            <label>
              Description:
              <textarea
                cols="50"
                value={description}
                onChange={(event) =>
                  setDescription(event.target.value)
                }
              />
            </label>
          </>
        ) : (
          'NOT RECORDING'
        )}
        <button
          type="button"
          onClick={stopRecording}
          disabled={!isRecording}
        >
          stop
        </button>
      </div>
      {children}
    </>
  )
}

RecordingPanel.propTypes = {
  isRecording: pt.bool.isRequired,
  stopRecording: pt.func.isRequired,
  filePath: pt.string.isRequired,
  setFilePath: pt.func.isRequired,
  description: pt.string.isRequired,
  setDescription: pt.func.isRequired,
  children: pt.node.isRequired,
}

export default RecordingPanel
