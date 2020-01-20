import React from 'react'
import '../styles/Progress.css'

function Progress({ loadingFile }) {
  const percent = loadingFile ? loadingFile.percent : 0;
  return (
    <div className={`Progress ${loadingFile ? '' : 'preload'}`}>
      <div 
        className="Progess-complete"
        style={{transform: `scaleX(${percent / 100})`}} 
      />
    </div>
  )
}

export default Progress;