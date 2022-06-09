const TodoList = require('../src/TodoList.js')

describe('TodoList', () => {
  let todoList
  let now
  beforeEach(() => {
    const nowDate = new Date()
    now = nowDate.toLocaleDateString()
    todoList = new TodoList()
  })

  it('creates a todo item', () => {
    // set up
    const expected = {
      id: 1,
      text: 'turn the heating on!',
      status: 'incomplete',
      createdAt: now
    }

    // execute
    const result = todoList.create('turn the heating on!')

    // verify
    expect(result).toEqual(expected)
  })

  it('returns all items', () => {
    // set up
    const item1 = {
      id: 1,
      text: 'turn the heating on!',
      status: 'incomplete',
      createdAt: now
    }
    const item2 = {
      id: 2,
      text: 'Do the washing up',
      status: 'incomplete',
      createdAt: now
    }
    const expected = [item1, item2]

    // execute
    todoList.create('turn the heating on!')
    todoList.create('Do the washing up')

    // verify
    expect(todoList.showAll()).toEqual(expected)
  })

  it('sets item to be complete if found', () => {
    // set up
    const item1 = todoList.create('turn the heating on!')
    const expected = {
      id: 1,
      text: 'turn the heating on!',
      status: 'complete',
      createdAt: now
    }

    // execute
    const result = todoList.setComplete(item1.id)

    // verify
    expect(result).toEqual(expected)
  })

  it('throws error if not found', () => {
    // set up

    // execute, verify
    expect(() => todoList.setComplete(1)).toThrowError('Item not found')
  })

  it('gets incomplete items', () => {
    // set up
    const item1 = todoList.create('turn the heating on!')
    const item2 = todoList.create('Do the washing up')
    todoList.setComplete(item1.id)
    const expected = [item2]

    // execute
    const result = todoList.getByStatus('incomplete')

    // verify
    expect(result).toEqual(expected)
  })

  it('gets complete items', () => {
    // set up
    const item1 = todoList.create('turn the heating on!')
    const item2 = todoList.create('Do the washing up')
    todoList.setComplete(item1.id)
    const expected = [item1]

    // execute
    const result = todoList.getByStatus('complete')

    // verify
    expect(result).toEqual(expected)
  })

  it('finds item by id', () => {
    // set up
    const item1 = todoList.create('turn the heating on!')
    const expected = {
      id: 1,
      text: 'turn the heating on!',
      status: 'incomplete',
      createdAt: now
    }

    // execute
    const result = todoList.findBy(item1.id)

    // verify
    expect(result).toEqual(expected)
  })

  it('findBy throws error if not found', () => {
    // set up

    // execute, verify
    expect(() => todoList.findBy(1)).toThrowError('Item not found')
  })

  it('deletes item by id', () => {
    // set up
    const item1 = todoList.create('turn the heating on!')
    const expected = {
      id: 1,
      text: 'turn the heating on!',
      status: 'incomplete',
      createdAt: now
    }

    // execute
    const deletedItem = todoList.deleteBy(1)

    // verify
    expect(deletedItem).toEqual(expected)
    expect(todoList.showAll()).toEqual([])
  })

  it('delete throws error if not found', () => {
    // set up

    // execute, verify
    expect(() => todoList.deleteBy(1)).toThrowError('Item not found')
  })
  it('will only display the first 20 characters when listing all items', () => {
    const expected = [
      {
        id: 1,
        text: 'llanfairpwllgwyngyll...',
        status: 'incomplete',
        createdAt: now
      }
    ]
    todoList.create(
      'llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch'
    )
    expect(todoList.showAll()).toEqual(expected)
  })
  it('will display the whole text when viewing a specific item', () => {
    const expected = {
      id: 1,
      text: 'llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch',
      status: 'incomplete',
      createdAt: now
    }

    const created = todoList.create(
      'llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch'
    )
    expect(todoList.findBy(created.id)).toEqual(expected)
  })
  it('will return a list of todos created on a specified date', () => {
    const item1 = todoList.create('do something')
    const item2 = todoList.create('do something else')

    const expected = [item1, item2]

    expect(todoList.findByDate(now)).toEqual(expected)
  })
  it('will return a empty list if no todos were created on the specified date', () => {
    todoList.create('do something')
    todoList.create('do something else')

    const expected = []

    expect(todoList.findByDate('01/01/1970')).toEqual(expected)
  })
})
