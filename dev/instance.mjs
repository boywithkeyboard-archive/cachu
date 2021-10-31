import { Cachu } from '../src/instance.mjs'

const cachu = new Cachu({
  maxAge: 300
})

async function dev() {
  await cachu.set(1, 'other')

  setTimeout(async () => {
    await cachu.set(2, 'item')
  }, 250)

  setTimeout(async () => {
    await cachu.set(3, 'item')
  }, 500)

  setTimeout(async () => {
    console.log(await cachu.purgeManyByCondition(item => {
      return item[1] === 'other'
    }))
    console.log(cachu.store)
  }, 1000)
}
dev()