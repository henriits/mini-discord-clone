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
  const [messagesByChannel, setMessagesByChannel] = useState({})

  const sendMessage = message => {
    if (currentChannel) {
      socket.emit('message:channel:send', currentChannel, message)
    }
  }

  // Select a channel and load its messages
  const handleChannelSelect = channel => {
    setCurrentChannel(channel)
  }

  // Handle WebSocket events
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
      const initialChannel = channels[0].name
      setCurrentChannel(initialChannel)

      // Initialize messagesByChannel for each channel
      const initialMessagesByChannel = channels.reduce((acc, channel) => {
        acc[channel.name] = channel.messages
        return acc
      }, {})
      setMessagesByChannel(initialMessagesByChannel)
    }

    const onMessageReceived = (channel, message) => {
      setMessagesByChannel(prev => ({
        ...prev,
        [channel]: [...(prev[channel] || []), message],
      }))
    }

    const onUsersUpdate = users => setUsers(users)

    const onUserJoin = user => {
      setUsers(prev => [...prev, user])

      // Add a welcome message in the "welcome" channel
      setMessagesByChannel(prev => ({
        ...prev,
        welcome: [
          ...(prev['welcome'] || []),
          { username: 'System', message: `${user.username} has joined the server!` },
        ],
      }))
    }

    const onUserLeave = user => {
      setUsers(prev => prev.map(u => (u.userId === user.userId ? { ...u, connected: false } : u)))
      // Add a "user has left" message in the "welcome" channel
      setMessagesByChannel(prev => ({
        ...prev,
        welcome: [
          ...(prev['welcome'] || []),
          { username: 'System', message: `${user.username} has left the server.` },
        ],
      }))
    }

    const onUserDisconnect = user => {
      setUsers(prev => prev.map(u => (u.userId === user.userId ? { ...u, connected: false } : u)))
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('session', onSession)
    socket.on('channels', onChannels)
    socket.on('message:channel', onMessageReceived)
    socket.on('users', onUsersUpdate)
    socket.on('user:join', onUserJoin) // Listen for 'user:join' event
    socket.on('user:leave', onUserLeave)
    socket.on('user:disconnect', onUserDisconnect)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off('session', onSession)
      socket.off('channels', onChannels)
      socket.off('message:channel', onMessageReceived)
      socket.off('users', onUsersUpdate)
      socket.off('user:join', onUserJoin)
      socket.off('user:leave', onUserLeave)
      socket.off('user:disconnect', onUserDisconnect)
    }
  }, [currentChannel])

  const leaveServer = () => {
    socket.emit('user:leave')
    socket.disconnect()
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
          <button onClick={leaveServer}>Leave Server</button>
          <div className="chat-layout">
            <ChannelList channels={channels} onChannelSelect={handleChannelSelect} />
            <div className="messages-container">
              <MessageList messages={messagesByChannel[currentChannel] || []} />
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
