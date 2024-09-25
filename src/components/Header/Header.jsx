import './Header.css'

function Header({ username }) {
  return (
    <header className="header">
      <h1 className="title">Mini-Discord-clone</h1>
      <p className="username">You are connected as {username}.</p>
    </header>
  )
}

export default Header
