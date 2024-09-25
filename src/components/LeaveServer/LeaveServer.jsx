import { useState } from 'react'
import { socket } from '@/libs/socket'
import SettingsIcon from '@/components/SettingsIcon/SettingsIcon'
import Button from '@/components/Button/Button'
import './LeaveServer.css'

function LeaveServer() {
  const [showButtons, setShowButtons] = useState(false)

  const handleSettingsClick = () => {
    setShowButtons(!showButtons)
  }

  return (
    <>
      <div className="settings-icon-background">
        <div className="settings-icon" onClick={handleSettingsClick}>
          <SettingsIcon />
        </div>
      </div>
      {showButtons && (
        <div className="button-container">
          <Button onClick={() => socket.emit('user:leave')}>Leave Server</Button>
          <Button onClick={() => socket.disconnect()}>Disconnect</Button>
        </div>
      )}
    </>
  )
}

export default LeaveServer
