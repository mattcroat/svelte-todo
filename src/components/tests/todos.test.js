import { tick } from 'svelte'
import { fireEvent, render, screen } from '@testing-library/svelte'

import Todos from '../todos.svelte'

// todo: able to add todo
// todo: check all todos
// todo: uncheck all todos
// todo: clear completed todos
// todo: filter todos

test('able to add a todo', async () => {
  render(Todos)

  let todoInputElement = screen.getByPlaceholderText(/what needs to be done?/i)

  fireEvent.input(todoInputElement, { target: { value: 'Todo' } })
  fireEvent.submit(todoInputElement)
  await tick()
  expect(screen.getByText('Todo')).toBeInTheDocument()
})
