export function padZero(number: number) {
  switch (true) {
    case (number<10):
      return `00${number}`
    case (number>9 && number<100):
      return `0${number}`
    default:
      return `${number}`
  }
}

export function adjustName(name: string) {
  const title = name.split('-').join(' ')

  if (!name || name == 'undefined') return 'PokéTracker'
  else if (name.split('-').length === 2) return name.split('-').join(' & ')
  else if (title.includes('and')) return title.split('and').join('&')
  else if (title.includes('lets')) {
    return title.split('lets').join("& let's").slice(2)
  } else if (title.includes('ultra')) {
    return title.split('ultra').join("& ultra").slice(2)
  } else if (title.includes('alpha')) {
    return title.split('alpha').join("& alpha")
  } else if (title.includes('2')) {
    return title.split('2').join('2 &').slice(0,-2)
  } else return title
}