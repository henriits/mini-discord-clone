import { useState } from 'react'

function MessageInput({ sendMessage }) {
  const [message, setMessage] = useState('')

  const handleSubmit = event => {
    event.preventDefault()
    if (message) {
      sendMessage(message)
      setMessage('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="message-input-form">
      <input
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="message-input"
      />
      <button type="submit" className="send-button">
        Send
      </button>
    </form>
  )
}

export default MessageInput
