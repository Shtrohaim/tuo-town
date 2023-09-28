export default function () {
  const priceTransform = (price: number) => {
    return price > 1000 ? String(price / 1000) + ' тыс. р.' : String(price) + ' р.'
  }

  const declensionWord = (num, words) => {
    return words[
      num % 100 > 4 && num % 100 < 20 ? 2 : [2, 0, 1, 1, 1, 2][num % 10 < 5 ? num % 10 : 5]
    ]
  }

  return { priceTransform, declensionWord }
}
