// Add your domain model below

Objects | Properties | Messages | Notes | Scenario | Output | Example
------- | ---------- | -------- | ----- | -------- | ------ | -------
TodoList | id @Int, items @Array | create(@String) | id increments, status starts off incomplete, adds item to array. Sets the createdAt field to todays current date in locale format | | todo item | `create('hello') => {id: 1, text: "hello", status: "incomplete", createdAt: '09/06/2022'}`
| | | showAll() | | | all items | `showAll() => [{id: 1, text: "hello", status: "incomplete", createdAt: '09/06/2022'}]`
| | | | |item has more than 20 characters | all items but with truncated text for items over 20 characters | `showAll() => [{id: 1, text: "this is a very long...", status: "incomplete", createdAt: '09/06/2022'}]`
| | | setComplete(@Int) | finds item, then updates status property | item exists | updated todo item | `setComplete(1) => {id: 1, text: "hello", status: "complete", createdAt: '09/06/2022'}`
| | | | | item does not exist | thrown error | `setComplete(1) => thrown error "Item not Found"`
| | | getByStatus(@String) | | | array, filtered by property status | `getByStatus("incomplete") => [{id: 1, text: "hello", status: "incomplete", createdAt: '09/06/2022'}]`
| | | findBy(@Int) | | item exists |item | `findBy(1) => {id: 1, text: "hello", status: "incomplete", createdAt: '09/06/2022'}`
| | | | | item does not exist | thrown error | `findBy(1) => thrown error "Item not Found"`
| | | deleteBy(@Int) | finds item, then removes it from array | item exists | item | `deleteBy(@Int) => {id: 1, text: "hello", status: "incomplete", createdAt: '09/06/2022'}`
| | | | | item does not exist | thrown error | `deleteBy(@Int) => thrown error "Item not Found"`
| | | findByDate(@string) | returns a list of todos that were created on the specified date | todos were created on specified date | all todos created on that date | `findByDate("09/06/2022) => [{id: 1, text: "do something", status: "incomplete", createdAt: '09/06/2022'}]`
| | | | | no todos for the specified date | empty list | `findByDate("09/06/2022) => []`
