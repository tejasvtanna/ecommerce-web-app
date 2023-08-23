import React, { ChangeEvent } from 'react'
import { Card, Form } from 'react-bootstrap'
import styles from './SearchFilter.module.css'

interface Props {
  heading: string
  options: string[]
  selection: string[]
  onSelectionChange: any
  optionSuffix?: string
}

const SearchFilter = ({ heading, options, selection, onSelectionChange, optionSuffix = '' }: Props) => {
  const handleChecked = (e: any, opt: string) => {
    if (e.target.checked) {
      onSelectionChange((arr: any) => [...arr, opt])
    } else {
      onSelectionChange((arr: any) => arr.filter((ele: string) => ele !== opt))
    }
  }

  return (
    <Card className={styles.card}>
      <Card.Header className={styles.header}>{heading}</Card.Header>
      <Card.Body>
        <Form>
          {options.map((opt: string, idx: number) => (
            <Form.Group className="mb-3" controlId={`${heading}` + idx} key={idx}>
              <Form.Check
                type="checkbox"
                label={opt + optionSuffix}
                checked={selection.indexOf(opt) >= 0}
                className={styles.label}
                onChange={(e: ChangeEvent<HTMLDivElement>) => handleChecked(e, opt)}
              />
            </Form.Group>
          ))}
        </Form>
      </Card.Body>
    </Card>
  )
}

export default SearchFilter
