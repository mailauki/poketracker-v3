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

export function captialize(word: any) {
  return word.charAt(0).toUpperCase()+word.substring(1)
}

export function adjustName(name: string) {
  const title = name.split('-').map((word) => captialize(word)).join(' ')
  
  if (title.includes('Lets')) {
    return title.split('Lets').join("& Let's").slice(2)
  } else if (title.includes('Of')) {
    return title.split('Of').join('of')
  } else if (title.includes('Xd')) {
    return title.toUpperCase()
  } else return title
}

// export function adjustName(name: string) {
//   const title = name.split('-').map((word) => captialize(word)).join(' ')

//   if (!name || name == 'undefined') return 'PokéTracker'
//   else if (name.split('-').length === 2 && name !== 'legends-arceus') {
//     return name.split('-').map((word) => captialize(word)).join(' & ')
//   } else if (title.includes('And')) {
//     return title.split('And').join('&')
//   } else if (title.includes('Lets')) {
//     return title.split('Lets').join("& Let's").slice(2)
//   } else if (title.includes('Ultra')) {
//     return title.split('Ultra').join("& Ultra").slice(2)
//   } else if (title.includes('Alpha')) {
//     return title.split('Alpha').join("& Alpha")
//   } else if (title.includes('2')) {
//     return title.split('2').join('2 &').slice(0,-2)
//   } else return title
// }

export function hyphenate(title: string) {
  return title?.toLowerCase().split(" ").join("-") || ''
}