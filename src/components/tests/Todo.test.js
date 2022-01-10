import { render, screen } from '@testing-library/svelte'

import Todo from '../Todo.svelte'

// todo: should display todo item
// todo: able to edit todo item
// todo: check todo item
// todo: uncheck todo item
// todo: remove todo
// todo: striketrough completed todo

test('should display todo item', () => {
  let todo = { id: 1, text: 'Todo', completed: false }

  let props = {
    duration: 0,
    editTodo: jest.fn(),
    removeTodo: jest.fn(),
    completeTodo: jest.fn(),
  }

  render(Todo, { todo, ...props })
  expect(screen.getByText(/todo/i)).toBeInTheDocument()
})
