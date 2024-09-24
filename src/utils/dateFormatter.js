export default function formatDate(timestamp) {
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }

  const formatter = new Intl.DateTimeFormat('en-US', options)
  const formattedDateTime = formatter.format(timestamp)

  // Split the formatted string into date and time components
  const [datePart, currentTime] = formattedDateTime.split(', ') // Assuming the format is "MM/DD/YYYY, HH:MM"

  // Get the current date
  const now = new Date()
  const year = now.getFullYear()
  const month = (now.getMonth() + 1).toString().padStart(2, '0')
  const day = now.getDate().toString().padStart(2, '0')

  // Format the current date as MM/DD/YYYY
  const DateNow = `${month}/${day}/${year}`
  if (datePart === DateNow) {
    return `Today at ${currentTime}`
  }

  return formattedDateTime
}
