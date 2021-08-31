export const utils = {
  dateFormat: (isoDate: string) => {
    const date = new Date(isoDate).toLocaleDateString('en-GB', {timeZone: 'UTC'})
    const time = new Date(isoDate).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: false})
    return {date, time}
  }
}
