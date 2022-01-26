import { render, screen } from '@testing-library/svelte'

import Todo from '../Todo.svelte'

// todo: should display todo item
// todo: able to edit todo item
// todo: check todo item as completed
// todo: uncheck todo item as incomplete
// todo: remove todo
// todo: striketrough completed todo

test('should display todo item', () => {
  let todo = { id: 1, text: 'Todo', completed: false }

  let props = {
    editTodo: jest.fn(),
    removeTodo: jest.fn(),
    completeTodo: jest.fn(),
    duration: 0,
  }

  render(Todo, { todo, ...props })

  expect(screen.getByText(/todo/i)).toBeInTheDocument()
})
