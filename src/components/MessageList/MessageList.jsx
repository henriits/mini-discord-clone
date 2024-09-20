import { useEffect, useRef } from 'react'
import './MessageList.css'

function MessageList({ messages }) {
  const messageListRef = useRef(null)

  useEffect(() => {
    // Scroll to the bottom of the message list whenever messages change
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div className="message-list" ref={messageListRef}>
      {messages.map((msg, index) => (
        <div key={index} className="message-item">
          <strong>{msg.user}</strong>: {msg.text}
        </div>
      ))}
    </div>
  )
}

export default MessageList
