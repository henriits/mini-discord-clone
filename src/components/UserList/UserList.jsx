import User from '@/components/User/User'
import './UserList.css'

function UserList({ users }) {
  return (
    <div className="user-list">
      <div className="online-users">
        <p className="user-status">ONLINE</p>
        {users.length > 0 &&
          users.filter(user => user.connected).map(user => <User key={user.userId} user={user} />)}
      </div>

      <div className="offline-users">
        <p className="user-status">OFFLINE</p>
        {users.length > 0 &&
          users.filter(user => !user.connected).map(user => <User key={user.userId} user={user} />)}
      </div>
    </div>
  )
}

export default UserList
