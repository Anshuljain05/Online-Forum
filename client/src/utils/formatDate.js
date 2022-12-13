export default function formatDate(newDate) {
    const months = {
      1: 'January',
      2: 'February',
      3: 'March',
      4: 'April',
      5: 'May',
      6: 'June',
      7: 'July',
      8: 'August',
      9: 'September',
      10: 'October',
      11: 'November',
      12: 'December',
    }
    const d = newDate
    const year = d.slice(0, 4)
    const monthNumber = d.slice(5,7)
    const date = d.slice(8,10)
    const monthName = months[monthNumber]
    const time = d.slice(11,19)
    const formatted = `${date} ${monthName}, ${year} - ${time}`
    return formatted
  }