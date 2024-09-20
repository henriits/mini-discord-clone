function UserList({ users }) {
  return (
    <div className="user-list">
      {users.map(user => (
        <div key={user.id} className="user-item">
          {user.username}
        </div>
      ))}
    </div>
  )
}

export default UserList
