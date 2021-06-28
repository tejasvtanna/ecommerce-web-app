import React from 'react'
import { Button } from '../Button'
import { fireEvent, render, screen, cleanup } from '@testing-library/react'
const renderer = require('react-test-renderer')

afterEach(cleanup)

// test # 1
test('<Button/> snapshot testing', () => {
  const component = renderer.create(
    <Button variant="light" block>
      First Button
    </Button>
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

// test # 2
test('Button is not disabled by default', () => {
  render(<Button></Button>)
  const btn = screen.getByTestId('btn')
  expect(btn).not.toBeDisabled()
})

// test # 3
test('Button is disabled', () => {
  render(<Button disabled={true}></Button>)
  const btn = screen.getByTestId('btn')
  expect(btn).toBeDisabled()
})

// test # 4
test('Button is not disabled', () => {
  render(<Button disabled={false}></Button>)
  const btn = screen.getByTestId('btn')
  expect(btn).not.toBeDisabled()
})

// test # 5
test('Callback is fired', () => {
  const onClickMock = jest.fn()
  render(<Button onClick={onClickMock} />)

  fireEvent.click(screen.getByTestId('btn'))
  expect(onClickMock).toHaveBeenCalled()
})
