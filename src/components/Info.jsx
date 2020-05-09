import React from 'react'

const Info = () => {

  return (
    <div style={{
      marginTop: "1rem",
      fontSize: "1rem"
    }}>
      <p>Searchbar navigable with Ctrl+J and Ctrl+K.</p>
      <p>Stops at the edges if the shortcut is being held down (press and hold).</p>
      <p>Starts over if not.</p>
    </div>
  )
}

export default Info