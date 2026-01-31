export function createShop(shop) {
  return new Promise(resolve => {
    setTimeout(() => resolve({ ...shop, id: Date.now() }), 500)
  })
}
