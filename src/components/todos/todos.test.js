import { fireEvent, render, screen } from '@testing-library/svelte'

import { tick } from 'svelte'
import Todos from './todos.svelte'

test('able to add a todo', async () => {
  render(Todos)

  let todoInputElement = screen.getByPlaceholderText(/what needs to be done?/i)

  fireEvent.input(todoInputElement, { target: { value: 'Todo' } })
  fireEvent.submit(todoInputElement)
  await tick()
  expect(screen.getByText('Todo')).toBeInTheDocument()
})
