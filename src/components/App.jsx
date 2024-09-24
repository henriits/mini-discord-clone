import { useState, useEffect } from 'react'
import { socket } from '@/libs/socket'
import Login from './Login/Login'
import MessageInput from './MessageInput/MessageInput'
import MessageList from './MessageList/MessageList'
import ChannelList from './ChannelList/ChannelList'
import UserList from './UserList/UserList'
import {
  handleConnect,
  handleDisconnect,
  handleSession,
  handleChannels,
  handleMessageReceived,
  handleUsersUpdate,
  handleUserJoin,
  handleUserLeave,
  handleUserDisconnect,
  addSystemMessageToWelcomeChannel,
} from '@/utils/socketHandlers'

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

  const handleChannelSelect = channel => {
    setCurrentChannel(channel)
  }

  useEffect(() => {
    const unregisterSocketEvents = () => {
      socket.off('connect')
      socket.off('disconnect')
      socket.off('session')
      socket.off('channels')
      socket.off('message:channel')
      socket.off('users')
      socket.off('user:join')
      socket.off('user:leave')
      socket.off('user:disconnect')
    }

    socket.on('connect', handleConnect(setIsConnected))
    socket.on('disconnect', handleDisconnect(setIsConnected, setUsername))
    socket.on('session', handleSession(setUsername))
    socket.on('channels', handleChannels(setChannels, setCurrentChannel, setMessagesByChannel))
    socket.on('message:channel', handleMessageReceived(setMessagesByChannel))
    socket.on('users', handleUsersUpdate(setUsers))
    socket.on(
      'user:join',
      handleUserJoin(setUsers, addSystemMessageToWelcomeChannel(setMessagesByChannel)),
    )
    socket.on(
      'user:leave',
      handleUserLeave(setUsers, addSystemMessageToWelcomeChannel(setMessagesByChannel)),
    )
    socket.on('user:disconnect', handleUserDisconnect(setUsers))

    return unregisterSocketEvents
  }, [currentChannel])

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
          <button onClick={() => socket.emit('user:leave')}>Leave Server</button>
          <button onClick={() => socket.disconnect()}>Disconnect</button>
          <div className="chat-layout">
            <ChannelList
              channels={channels}
              onChannelSelect={handleChannelSelect}
              currentChannel={currentChannel}
            />
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
