import './ChannelList.css'

function ChannelList({ channels, onChannelSelect, currentChannel }) {
  return (
    <div className="channel-list">
      {channels.map(channel => (
        <div
          key={channel.name}
          className={`channel-item ${currentChannel === channel.name ? 'selected' : ''}`}
          onClick={() => onChannelSelect(channel.name)}
        >
          #{channel.name}
        </div>
      ))}
    </div>
  )
}

export default ChannelList
