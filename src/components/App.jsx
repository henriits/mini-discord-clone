import { useState, useEffect } from 'react'
import { socket } from '@/libs/socket'
import Login from './Login/Login'
import MessageInput from './MessageInput/MessageInput'
import MessageList from './MessageList/MessageList'
import ChannelList from './ChannelList/ChannelList'
import UserList from './UserList/UserList'

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [username, setUsername] = useState(null)
  const [messages, setMessages] = useState([])
  const [channels, setChannels] = useState([])
  const [users, setUsers] = useState([])

  const sendMessage = message => {
    socket.emit('message:channel:send', 'general', message) // Send to the general channel
  }

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true)
    }

    const onDisconnect = () => {
      setIsConnected(false)
      setUsername(null)
    }

    const onMessageReceived = (channel, message) => {
      setMessages(prev => [...prev, message])
    }

    const onChannelsReceived = channels => {
      setChannels(channels)
    }

    const onUsersUpdate = users => {
      setUsers(users)
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('message:channel', onMessageReceived)
    socket.on('channels', onChannelsReceived)
    socket.on('users', onUsersUpdate)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off('message:channel', onMessageReceived)
      socket.off('channels', onChannelsReceived)
      socket.off('users', onUsersUpdate)
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
