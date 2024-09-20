import { useState } from 'react'
import { socket } from '@/libs/socket'
import './Login.css'

function Login({ setUsername }) {
  const [username, setUsernameState] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    socket.auth = { username } // Set the username for the socket
    socket.connect() // Connect to the socket
    setUsername(username) // Update the username in the App component
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="username-form">
        <input
          value={username}
          onChange={e => setUsernameState(e.target.value)}
          placeholder="Enter your username"
          className="username-input"
        />
        <button type="submit" className="login-button">
          Connect
        </button>
      </form>
    </div>
  )
}

export default Login
