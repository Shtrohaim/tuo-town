const telMask = (value: string) => {
  const numberLength = 11
  value = value.replace(/[^Z0-9]/g, '')
  let result = ''

  if (value[0] === '8') {
    value = '7'
  }

  if (value[0] !== '7' && value) {
    value = '7' + value
  }

  for (let i = 0; i < value.length && i < numberLength; i++) {
    switch (i) {
      case 0:
        result += '+'
        break
      case 1:
        result += ' ('
        break
      case 4:
        result += ') '
        break
      case 7:
        result += '-'
        break
      case 9:
        result += '-'
        break
      default:
        break
    }
    result += value[i]
  }
  return result
}

export default telMask
