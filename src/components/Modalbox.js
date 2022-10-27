import React from 'react'

export default function Modalbox({open, children, onClose}) {
  if (!open) return null
  
  return (
    <div>
      <button onClick={onClose}></button>
      {children}
    </div>
  )
}
