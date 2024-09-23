function ChannelList({ channels, onChannelSelect }) {
  return (
    <div className="channel-list">
      {channels.map(channel => (
        <div
          key={channel.name}
          className="channel-item"
          onClick={() => onChannelSelect(channel.name)}
        >
          #{channel.name}
        </div>
      ))}
    </div>
  )
}

export default ChannelList
