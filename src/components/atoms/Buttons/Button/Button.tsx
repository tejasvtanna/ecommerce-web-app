import React from 'react'
import CSS from 'csstype'
import { Button as RButton } from 'react-bootstrap'

interface Props {
  variant?: string
  block?: boolean
  customStyle?: CSS.Properties
  disabled?: boolean
  type?: string
  onClick?: (e: React.MouseEvent) => void
}

export const Button: React.FC<Props> = ({
  block = true,
  variant,
  disabled = false,
  customStyle,
  onClick,
  children,
  type,
}) => {
  return (
    <>
      {!variant && (
        <RButton
          style={{ backgroundColor: '#ff3e6c', borderColor: '#ff3e6c', ...customStyle }}
          block={block}
          disabled={disabled}
          type={type}
          onClick={onClick}
          data-testid="btn">
          {children}
        </RButton>
      )}
      {variant && (
        <RButton
          variant={variant}
          style={{ ...customStyle }}
          block={block}
          disabled={disabled}
          type={type}
          onClick={onClick}
          data-testid="btn">
          {children}
        </RButton>
      )}
    </>
  )
}
