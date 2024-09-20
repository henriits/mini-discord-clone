function ChannelList({ channels }) {
  return (
    <div className="channel-list">
      {channels.map(channel => (
        <div key={channel.id} className="channel-item">
          {channel.name}
        </div>
      ))}
    </div>
  )
}

export default ChannelList
