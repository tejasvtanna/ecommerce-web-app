import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { IncrementDecrement } from '../IncrementDecrement'
const renderer = require('react-test-renderer')

afterEach(cleanup)

// test # 1
test('scapshot testing', () => {
  const component = renderer.create(
    <IncrementDecrement count={1} onIncrement={() => {}} onDecrement={() => {}}></IncrementDecrement>
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('contains text 1 initially', () => {
  render(<IncrementDecrement count={1} onIncrement={undefined} onDecrement={undefined}></IncrementDecrement>)
  expect(screen.getByTestId('count')).toHaveTextContent('1')
})

test('have + and - buttons', () => {
  render(<IncrementDecrement count={1} onDecrement={undefined} onIncrement={undefined}></IncrementDecrement>)
  expect(screen.getByText('+')).toBeInTheDocument()
  expect(screen.getByText('-')).toBeInTheDocument()
})
