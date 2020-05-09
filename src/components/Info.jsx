import React from 'react'

const Info = () => {

  return (
    <div style={{
      position: 'absolute',
      bottom: 0,
      marginBottom: "1rem",
      fontSize: "1rem"
    }}>
      <p>Searchbox navigable with Ctrl+J and Ctrl+K.</p>
      <p>Stops at the edges if the shortcut is being held down (press and hold).</p>
      <p>Starts over if not.</p>
    </div>
  )
}

export default Info