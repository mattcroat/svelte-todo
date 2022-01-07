import { fireEvent, render, screen } from '@testing-library/svelte'

import AddTodo from '../add-todo.svelte'

function renderAddTodo(amount = 0) {
  let props = {
    addTodo: jest.fn(),
    toggleCompleted: jest.fn(),
    amount,
  }
  render(AddTodo, { ...props })
  return props
}

test('input should have focus on page load', () => {
  renderAddTodo()
  let todoInputElement = screen.getByPlaceholderText(/what needs to be done/i)
  expect(todoInputElement).toHaveFocus()
})

test('user is able to type into the input', () => {
  renderAddTodo()

  let inputValue = 'Watch Cowboy Bebop'

  let todoInputElement = screen.getByPlaceholderText(/what needs to be done/i)
  fireEvent.change(todoInputElement, { target: { value: inputValue } })
  expect(todoInputElement).toHaveValue(inputValue)
})

test('user is able to submit todo', () => {
  let { addTodo } = renderAddTodo()

  let inputValue = 'Watch Cowboy Bebop'

  let todoInputElement = screen.getByPlaceholderText(/what needs to be done/i)
  fireEvent.change(todoInputElement, { target: { value: inputValue } })
  fireEvent.submit(todoInputElement)

  expect(addTodo).toHaveBeenCalledTimes(1)
})
