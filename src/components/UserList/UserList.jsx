function UserList({ users }) {
  return (
    <div className="user-list">
      {users.map(user => (
        <div key={user.userId} className="user-item">
          {user.username} {user.connected ? '🟢' : '🔴'}
        </div>
      ))}
    </div>
  )
}

export default UserList
