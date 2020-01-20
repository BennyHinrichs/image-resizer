import React from 'react'
import '../styles/Button.css'

function Button({label, onClick, disabled = false}) {
  return(
    <button
      className="Button"
      disabled={disabled}
      onClick={onClick}
    >
      {label}      
    </button>
  )
}

export default Button;