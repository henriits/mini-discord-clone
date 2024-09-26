import { useEffect, useRef } from 'react'
import './MessageList.css'
import formatDate from '@/utils/dateFormatter'
import Avatar from '../Avatar/Avatar'

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

        // Check if this is a system message
        const isSystemMessage = msg.username === 'System'

        return (
          <div key={index} className="message-item">
            <div className="message-content">
              {/* If system msg - don't show avatar */}
              {!isSystemMessage && <Avatar />}
              <div className="message-text">
                <div className="message-header">
                  {/* If system msg - don't show username */}
                  {!isSystemMessage && <strong className="username-color">{msg.username}</strong>}
                  <span className="timestamp">{formatDate(msg.timestamp)}</span>
                </div>
                <div className="message-body">{msg.message}</div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default MessageList
