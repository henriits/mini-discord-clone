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
  const [channels, setChannels] = useState([])
  const [users, setUsers] = useState([])
  const [currentChannel, setCurrentChannel] = useState(null)
  const [messages, setMessages] = useState([])

  const sendMessage = message => {
    if (currentChannel) {
      socket.emit('message:channel:send', currentChannel, message)
    }
  }

  useEffect(() => {
    const onConnect = () => setIsConnected(true)

    const onDisconnect = () => {
      setIsConnected(false)
      setUsername(null)
    }

    const onSession = session => {
      setUsername(session.username)
    }

    const onChannels = channels => {
      setChannels(channels)
      setCurrentChannel(channels[0].name) // Auto-select first channel
      setMessages(channels[0].messages) // Load initial messages for the first channel
    }

    const onMessageReceived = (channel, message) => {
      if (channel === currentChannel) {
        setMessages(prev => [...prev, message])
      }
    }

    const onUsersUpdate = users => setUsers(users)

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('session', onSession)
    socket.on('channels', onChannels)
    socket.on('message:channel', onMessageReceived)
    socket.on('users', onUsersUpdate)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off('session', onSession)
      socket.off('channels', onChannels)
      socket.off('message:channel', onMessageReceived)
      socket.off('users', onUsersUpdate)
    }
  }, [currentChannel])

  const handleChannelSelect = channel => {
    const selectedChannel = channels.find(ch => ch.name === channel)
    if (selectedChannel) {
      setCurrentChannel(channel)
      setMessages(selectedChannel.messages) // Load messages for the selected channel
    }
  }

  return (
    <div className="app-container">
      {!isConnected ? (
        <Login setUsername={setUsername} />
      ) : (
        <div className="main-container">
          <p>Mini-Discord-clone</p>
          <p>
            You are connected as {username} in #{currentChannel}.
          </p>
          <div className="chat-layout">
            <ChannelList channels={channels} onChannelSelect={handleChannelSelect} />
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
