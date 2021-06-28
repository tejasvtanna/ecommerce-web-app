import { useState } from 'react'
import { Navbar, Nav, NavDropdown, Form, FormControl, Badge, InputGroup } from 'react-bootstrap'
import { FiShoppingCart, FiHeart } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styles from './navbar.module.css'
import { useAuth } from 'contexts/AuthContext'
import { userActions } from 'redux/actions/userActions'
import { BiSearchAlt2 } from 'react-icons/bi'
import logo from 'assets/logo.png'

interface Props {}

const Navbar2 = ({}: Props) => {
  const { loggedIn, user } = useSelector((state: any) => state.user)
  const { signout } = useAuth()

  const cartItemsCount = useSelector((state: any) => state.cart.items.length)
  const wishCount = useSelector((state: any) => state.wishlist.list.length)
  const [searchText, setSearchText] = useState('')

  const history = useHistory()
  const dispatch = useDispatch()

  const logOutHandler = async () => {
    signout()
    dispatch(userActions.logOut())
    dispatch(userActions.resetStore())
    history.push('/')

    // await fire.auth().signOut()
    // history.push('/')
    // dispatch({ type: 'LOG_OUT' })
  }

  const handleSearch = (e?: any) => {
    if (e) e.preventDefault()
    history.push(`/search?q=${searchText}`)
    // window.history.pushState({}, '', `/search?q=${searchText}`)
  }

  return (
    <Navbar expand="lg" className={styles.navbar}>
      <Navbar.Brand as={Link} to="/" className={styles.brand2}>
        <img src={logo} className={styles.logo} />
      </Navbar.Brand>
      {/* <Nav.Link as={Link} to={`/`}>
        <span className={styles.brand2}>
          Little<span className={styles.tags}>Tags</span>
        </span>
      </Nav.Link> */}
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to={`/search?category=Men`} className={styles.link}>
            Men
          </Nav.Link>
          <Nav.Link as={Link} to={`/search?category=Women`} className={styles.link}>
            Women
          </Nav.Link>
          <Nav.Link as={Link} to={`/search?category=Kids`} className={styles.link}>
            Kids
          </Nav.Link>
          <Form inline onSubmit={handleSearch}>
            <InputGroup>
              <Form.Control
                value={searchText}
                type="text"
                className={styles.search}
                placeholder="Search Products"
                onChange={(e: any) => setSearchText(e.target.value)}
              />
              <InputGroup.Append>
                <InputGroup.Text>
                  <BiSearchAlt2 className={styles.searchIcon} onClick={() => handleSearch()} />
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
            {/* <FormControl
              value={searchText}
              className={styles.search}
              type="text"
              placeholder="Search Products"
              onChange={(e: any) => setSearchText(e.target.value)}
            /> */}
          </Form>
        </Nav>
        <Nav>
          {loggedIn && (
            <>
              <NavDropdown title={user?.firstName} id="basic-nav-dropdown" className={styles.link}>
                <NavDropdown.Item as={Link} to="/profile/addresses">
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/profile/orders">
                  Orders
                </NavDropdown.Item>
                <NavDropdown.Item onClick={logOutHandler}>Log Out</NavDropdown.Item>
                {/* <NavDropdown.Divider /> */}
              </NavDropdown>
              <Nav.Link as={Link} to="/profile/wishlist">
                <FiHeart className={styles.icon} />
                {wishCount > 0 && (
                  <Badge style={{ backgroundColor: ' #ff3e6c', color: 'white', position: 'absolute' }}>
                    {wishCount}
                  </Badge>
                )}
              </Nav.Link>
              &nbsp;&nbsp;
              <Nav.Link as={Link} to="/cart">
                <FiShoppingCart className={styles.icon} />
                {cartItemsCount > 0 && (
                  <Badge style={{ backgroundColor: ' #ff3e6c', color: 'white', position: 'absolute' }}>
                    {cartItemsCount}
                  </Badge>
                )}
              </Nav.Link>
            </>
          )}
          {!loggedIn && (
            <NavDropdown title="Account" id="basic-nav-dropdown" className={styles.link}>
              <NavDropdown.Item as={Link} to="/login">
                Login
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/register">
                Register
              </NavDropdown.Item>
            </NavDropdown>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navbar2
