import './MessageList.css'

function MessageList({ messages }) {
  return (
    <div className="message-list">
      {messages.map((msg, index) => (
        <div key={index} className="message-item">
          <strong>{msg.user}</strong>: {msg.text}
        </div>
      ))}
    </div>
  )
}

export default MessageList
