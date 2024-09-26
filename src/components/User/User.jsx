import Avatar from '@/components/Avatar/Avatar'
import './User.css'

function User({ user }) {
  return (
    <div className="user-item">
      <div className="avatar-wrapper">
        <Avatar />
        <span className={`status-dot ${user.connected ? 'online' : 'offline'}`} />
      </div>
      {user.username}
    </div>
  )
}

export default User
