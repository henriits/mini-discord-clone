import { useState, useEffect } from 'react'
import { socket } from '@/libs/socket'
import Login from './Login/Login'
import MessageInput from './MessageInput/MessageInput'

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [username, setUsername] = useState(null) // State to hold the username

  useEffect(() => {
    // Event listeners for socket connection
    const onConnect = () => {
      setIsConnected(true)
    }

    const onDisconnect = () => {
      setIsConnected(false)
      setUsername(null) // Clear the username on disconnect
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)

    // Clean up the event listeners on unmount
    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
    }
  }, [])

  return (
    <div>
      {/* Show different components based on the connection state */}
      {!isConnected ? (
        <Login setUsername={setUsername} />
      ) : (
        <div className="main-container">
          <h1>Welcome to the Dashboard!</h1>
          <p>You are successfully connected as {username}.</p> {/* Display username */}
          <MessageInput />
        </div>
      )}
    </div>
  )
}

export default App
