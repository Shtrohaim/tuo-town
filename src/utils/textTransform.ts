export default function () {
  const priceTransform = (price: number) => {
    return price > 1000 ? String(price / 1000) + ' тыс. р.' : String(price) + ' р.'
  }

  return { priceTransform }
}
