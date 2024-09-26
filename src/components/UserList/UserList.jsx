import User from '@/components/User/User'
import './UserList.css'

function UserList({ users }) {
  const onlineUsers = users.filter(user => user.connected)
  const offlineUsers = users.filter(user => !user.connected)

  return (
    <div className="user-list">
      <div className="online-users">
        <p className="user-status">ONLINE -- {onlineUsers.length}</p>
        {onlineUsers.map(user => (
          <User key={user.userId} user={user} />
        ))}
      </div>

      <div className="offline-users">
        <p className="user-status">OFFLINE -- {offlineUsers.length}</p>
        {offlineUsers.map(user => (
          <User key={user.userId} user={user} />
        ))}
      </div>
    </div>
  )
}

export default UserList
