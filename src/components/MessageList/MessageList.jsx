import { useEffect, useRef } from 'react'
import './MessageList.css'
import formatDate from '@/utils/dateFormatter'

function MessageList({ messages }) {
  const messageListRef = useRef(null)

  // Scroll to the bottom of the message list when messages are updated
  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div className="message-list" ref={messageListRef}>
      {messages.map((msg, index) => {
        console.log(`Message ${index}:`, msg) // Debugging log
        return (
          <div key={index} className="message-item">
            <strong className="username-color">{msg.username}</strong>
            <span className="timestamp">{formatDate(msg.timestamp)}</span>
            <br />
            <br />
            {msg.message}
          </div>
        )
      })}
    </div>
  )
}

export default MessageList
