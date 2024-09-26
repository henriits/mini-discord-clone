import { useState } from 'react'
import { socket } from '@/libs/socket'
import './Login.css'
import Button from '../Button/Button'

function Login({ setUsername }) {
  const [username, setUsernameState] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    if (!username.trim()) {
      setError('Username cannot be empty.')
      return
    }

    setError('')

    socket.auth = { username }
    socket.connect()
    setUsername(username)
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
        {error && <p className="error-message">{error}</p>}
        <Button type="submit">Connect</Button>
      </form>
    </div>
  )
}

export default Login
