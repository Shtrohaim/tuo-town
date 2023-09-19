export default function () {
  const priceTransform = (price: number) => {
    return String(price / 1000) + ' тыс. р.'
  }

  return { priceTransform }
}
