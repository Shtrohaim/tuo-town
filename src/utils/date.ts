const getLocalDate = (strDate: string) => {
  const date = new Date(strDate)
  return (
    date.toLocaleDateString('ru-RU', { day: 'numeric' }) +
    ' ' +
    date.toLocaleDateString('ru-RU', { month: 'long' }) +
    ' ' +
    date.toLocaleDateString('ru-RU', { year: 'numeric' }) +
    ' ' +
    date.toLocaleTimeString('ru-RU', { hour: '2-digit' }) +
    ':' +
    date.toLocaleTimeString('ru-RU', { minute: '2-digit' })
  )
}
export default getLocalDate
