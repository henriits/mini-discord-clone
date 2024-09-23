import './UserList.css'

function UserList({ users }) {
  return (
    <div className="users-container">
      <div className="online-users">
        <p className="user-status">ONLINE</p>
        {users.length > 0 &&
          users
            .filter(user => user.connected)
            .map(user => (
              <div key={user.userId} className="user-item">
                <span className="status-dot online" />
                {user.username}
              </div>
            ))}
      </div>

      <div className="offline-users">
        <p className="user-status">OFFLINE</p>
        {users.length > 0 &&
          users
            .filter(user => !user.connected)
            .map(user => (
              <div key={user.userId} className="user-item">
                <span className="status-dot offline" />
                {user.username}
              </div>
            ))}
      </div>
    </div>
  )
}

export default UserList
