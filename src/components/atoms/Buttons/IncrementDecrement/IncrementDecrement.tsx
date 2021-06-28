import React from 'react'
import styles from './IncrementDecrement.module.css'
import { Button } from 'components/atoms/Buttons'
import { fireEvent, render, screen, cleanup } from '@testing-library/react'

interface Props {
  count: number
  onIncrement: any
  onDecrement: any
}

export const IncrementDecrement = ({ count, onIncrement, onDecrement }: Props) => {
  return (
    <div className={styles.buttonsWrapper1}>
      <Button onClick={onDecrement} block={false}>
        -
      </Button>
      <h5 className={styles.counter} data-testid="count">
        {count}
      </h5>
      <Button onClick={onIncrement} block={false}>
        +
      </Button>
    </div>
  )
}
