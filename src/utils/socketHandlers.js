// Helper to update the users list
export const updateUsers = (users, userToUpdate, connected) => {
  return users.map(user => (user.userId === userToUpdate.userId ? { ...user, connected } : user))
}

// Handles socket connection
export const handleConnect = setIsConnected => () => {
  setIsConnected(true)
}

// Handles socket disconnection
export const handleDisconnect = (setIsConnected, setUsername) => () => {
  setIsConnected(false)
  setUsername(null)
}

// Handles session establishment
export const handleSession = setUsername => session => {
  setUsername(session.username)
}

// Handles receiving channels
export const handleChannels =
  (setChannels, setCurrentChannel, setMessagesByChannel) => channels => {
    setChannels(channels)
    const initialChannel = channels[0]?.name || null
    setCurrentChannel(initialChannel)

    // Initialize messages by channel
    const initialMessages = channels.reduce((acc, channel) => {
      acc[channel.name] = channel.messages
      return acc
    }, {})
    setMessagesByChannel(initialMessages)
  }

// Handles new messages in a channel
export const handleMessageReceived = setMessagesByChannel => (channel, message) => {
  setMessagesByChannel(prev => ({
    ...prev,
    [channel]: [...(prev[channel] || []), message],
  }))
}

// Handles user updates
export const handleUsersUpdate = setUsers => updatedUsers => {
  setUsers(updatedUsers)
}

// Handles a user joining
export const handleUserJoin = (setUsers, addSystemMessageToWelcomeChannel) => user => {
  setUsers(prevUsers => {
    const existingUser = prevUsers.find(u => u.userId === user.userId)
    const newUsers = existingUser ? updateUsers(prevUsers, user, true) : [...prevUsers, user]
    return newUsers
  })
  addSystemMessageToWelcomeChannel(`${user.username} has joined the server!`)
}

// Handles a user leaving
export const handleUserLeave = (setUsers, addSystemMessageToWelcomeChannel) => user => {
  setUsers(prevUsers => prevUsers.filter(u => u.userId !== user.userId))
  addSystemMessageToWelcomeChannel(`${user.username} has left the server.`)
}

// Handles user disconnect (i.e., losing connection)
export const handleUserDisconnect = setUsers => user => {
  setUsers(prevUsers => updateUsers(prevUsers, user, false))
}

// Adds system messages to the "welcome" channel with a timestamp
export const addSystemMessageToWelcomeChannel = setMessagesByChannel => message => {
  const systemMessage = {
    username: 'System',
    message,
    timestamp: Date.now(),
  }

  setMessagesByChannel(prevMessages => ({
    ...prevMessages,
    welcome: [...(prevMessages['welcome'] || []), systemMessage],
  }))
}
