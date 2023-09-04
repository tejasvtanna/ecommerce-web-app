import React from 'react'
import styles from './IncrementDecrement.module.css'
import { Button } from 'components/atoms/Buttons'

interface Props {
  count: number
  onIncrement: (e: React.MouseEvent) => void
  onDecrement: (e: React.MouseEvent) => void
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
