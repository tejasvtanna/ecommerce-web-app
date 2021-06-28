import React from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import styles from './breadcrumbs.module.css'
import cx from 'classnames'
import { toTitleCase } from 'utilities/utilFunctions'

interface Props {}

const BreadCrumbs = ({}: Props) => {
  const {
    location: { pathname },
  } = useHistory()
  // console.log('******', pathname.split('/'));
  let pages: string[] = pathname.split('/')

  return (
    <div className={cx(styles['page__section'])}>
      <nav className={cx(styles['breadcrumb'], styles['breadcrumb_type4'])} aria-label="Breadcrumb">
        <ol className={cx(styles['breadcrumb__list'], styles['r-list'])}>
          {pages.map((el, index) => {
            if (index !== pages.length - 1) {
              return (
                <li key={index} className={cx(styles['breadcrumb__group'])}>
                  <Link to={`/${el}`} className={cx(styles['breadcrumb__point'], styles['r-link'])}>
                    {el === '' ? 'Home' : toTitleCase(el)}
                  </Link>

                  <span className={cx(styles['breadcrumb__divider'])} aria-hidden="true">
                    /
                  </span>
                </li>
              )
            } else {
              return (
                <li key={index} className={cx(styles['breadcrumb__group'])}>
                  <span className={cx(styles['breadcrumb__point'])} aria-current="page">
                    {toTitleCase(el)}
                  </span>
                </li>
              )
            }
          })}
        </ol>
      </nav>
    </div>
  )
}

export default BreadCrumbs
