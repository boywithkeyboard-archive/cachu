export const generateEntries = async (cache, amount) => {
  let iterations = amount
  while(iterations > 0) {
    await cache.write(iterations, `smth${iterations}`)
    iterations--
  }
}