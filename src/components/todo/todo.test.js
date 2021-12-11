import { render, screen } from '@testing-library/svelte'

import Todo from './todo.svelte'

test('should display todo item', () => {
  let todo = { id: 1, text: 'Todo', completed: false }

  let props = {
    duration: 0,
    editTodo: jest.fn(),
    removeTodo: jest.fn(),
    completeTodo: jest.fn()
  }

  render(Todo, { todo, ...props })
  expect(screen.getByText(/todo/i)).toBeInTheDocument()
})
