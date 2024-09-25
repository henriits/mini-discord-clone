import { useState } from 'react'
import './MessageInput.css'
import Button from '@/components/Button/Button'

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
      <Button type="submit" className="send-button">
        Send
      </Button>
    </form>
  )
}

export default MessageInput
