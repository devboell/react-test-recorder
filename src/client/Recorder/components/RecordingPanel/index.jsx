import React from 'react'
import pt from 'prop-types'

import './index.css'

const RecordingPanel = ({
  isRecording,
  stopRecording,
  setFilePath,
  filePath,
  children,
}) => {
  return (
    <>
      <div className="recorder-container">
        {isRecording ? (
          <>
            <input
              type="text"
              value={filePath}
              onChange={(event) => setFilePath(event.target.value)}
            />
            <input
              type="text"
              value={filePath}
              onChange={(event) => setFilePath(event.target.value)}
            />
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
  setFilePath: pt.func.isRequired,
  filePath: pt.string.isRequired,
  children: pt.node.isRequired,
}

export default RecordingPanel
