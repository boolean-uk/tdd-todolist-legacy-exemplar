const MAX_CHARACTERS_TO_DISPLAY = 20
class TodoList {
  constructor() {
    this.id = 0
    this.items = []
  }

  create(str) {
    const now = new Date()
    this.id++
    const item = {
      id: this.id,
      text: str,
      status: 'incomplete',
      createdAt: now.toLocaleDateString()
    }
    this.items.push(item)
    return item
  }

  showAll() {
    const items = this.items.map((item) => {
      let str = item.text
      if (str.length > 20) {
        str = item.text.substring(0, MAX_CHARACTERS_TO_DISPLAY) + '...'
      }
      return {
        ...item,
        text: str
      }
    })
    return items
  }

  setComplete(id) {
    const item = this.findBy(id)
    item.status = 'complete'
    return item
  }

  getByStatus(status) {
    return this.items.filter((item) => item.status === status)
  }

  findBy(id) {
    const item = this.items.find((item) => item.id === id)
    if (item === undefined) throw new Error('Item not found')
    return item
  }

  findByDate(date) {
    return this.items.filter((item) => item.createdAt === date)
  }

  deleteBy(id) {
    const item = this.findBy(id)
    const index = this.items.indexOf(item)
    return this.items.splice(index, 1)[0]
  }
}

module.exports = TodoList
