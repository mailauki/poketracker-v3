export default function padZero(number: number) {
  switch (true) {
    case (number<10):
      return `00${number}`
    case (number>9 && number<100):
      return `0${number}`
    default:
      return `${number}`
  }
}