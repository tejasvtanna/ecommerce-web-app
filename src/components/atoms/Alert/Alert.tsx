import React, { useEffect } from 'react'
import { Alert as RBAlert } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import styles from './Alert.module.css'
import { alertActions } from 'redux/actions'

const Alert = () => {
  const dispatch = useDispatch()
  const { type, message, linkText, linkHref } = useSelector((state: any) => state.alert)

  // console.log(`type: `, type)

  useEffect(() => {
    if (message)
      window.setTimeout(() => {
        dispatch(alertActions.clear())
      }, 1500)
  }, [message, dispatch])

  return (
    <RBAlert variant={type} className={styles.alert}>
      {message}
      {linkText && <RBAlert.Link to={linkHref}>{linkText}</RBAlert.Link>}
    </RBAlert>
  )
}

export default Alert
