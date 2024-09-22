import { useEffect, useRef } from 'react'
import './MessageList.css'

function MessageList({ messages }) {
  const messageListRef = useRef(null)

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div className="message-list" ref={messageListRef}>
      {messages.map((msg, index) => (
        <div key={index} className="message-item">
          <strong>{msg.username}</strong>: {msg.message}
        </div>
      ))}
    </div>
  )
}

export default MessageList
