import { fireEvent, render, screen } from '@testing-library/svelte'

import Example from '../components/example.svelte'

test('shows proper heading when rendered', () => {
  render(Example, { name: 'World' })
  expect(screen.getByText('Hello, World!')).toBeInTheDocument()
})

test('changes button text on click', async () => {
  render(Example, { name: 'World' })
  let button = screen.getByText('Button')

  await fireEvent.click(button)

  expect(button).toHaveTextContent('Clicked')
})
