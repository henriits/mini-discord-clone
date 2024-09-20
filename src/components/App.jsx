import { useState, useEffect } from 'react'
import { socket } from '@/libs/socket'
import Login from './Login/Login'
import MessageInput from './MessageInput/MessageInput'
import MessageList from './MessageList/MessageList'
import ChannelList from './ChannelList/ChannelList'
import UserList from './UserList/UserList'

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [username, setUsername] = useState(null) // State to hold the username
  const [messages, setMessages] = useState([])
  const [channels] = useState([
    { id: 1, name: 'General' },
    { id: 2, name: 'Random' },
  ]) // add static data for moment
  const [users] = useState([
    { id: 1, username: 'User1' },
    { id: 2, username: 'User2' },
  ]) // add static data for moment

  const sendMessage = message => {
    setMessages(prev => [...prev, { user: username, text: message }])
  }

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
    <div className="app-container">
      {!isConnected ? (
        <Login setUsername={setUsername} />
      ) : (
        <div className="main-container">
          <p>Mini-Discord-clone</p>
          <p>You are successfully connected as {username}.</p>
          <div className="chat-layout">
            <ChannelList channels={channels} />
            <div className="messages-container">
              <MessageList messages={messages} />
              <MessageInput sendMessage={sendMessage} />
            </div>
            <UserList users={users} />
          </div>
        </div>
      )}
    </div>
  )
}

export default App
