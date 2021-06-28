import { useEffect, useState } from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import { addressActions, userActions } from 'redux/actions'
import { useSelector, useDispatch } from 'react-redux'
import { FaCheck } from 'react-icons/fa'
import styles from './ManageAddress.module.css'
import { useAuth } from 'contexts/AuthContext'
import AddAddress from 'components/molecules/Address/AddAddress/AddAddress'
import { Button } from 'components/atoms/Buttons'
import FadingLoader from 'components/atoms/Loaders/FadingLoader'

const ManageAddress = () => {
  const dispatch = useDispatch()
  const { currentUser } = useAuth()
  const loading = useSelector((state: any) => state.addresses.loading)
  const addresses = useSelector((state: any) => state.addresses.list)
  const { user } = useSelector((state: any) => state.user)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (!addresses.length) dispatch(addressActions.getAddressesByUser(currentUser.uid))
  }, [])

  const handleSetDefaultAddr = (id: number) => {
    const updatedUser = { ...user, defaultAddressId: id }
    dispatch(userActions.changeDefaultAddress(updatedUser))
  }

  return (
    <>
      <Row>
        <Col sm={10}></Col>
        <Col>
          <Button customStyle={{ float: 'right' }} onClick={() => setShowModal(true)}>
            Add Address
          </Button>
        </Col>
      </Row>
      <Row>{showModal && <AddAddress setShowModal={setShowModal} />}</Row>
      <Row>
        <br />
        {loading && <FadingLoader />}
      </Row>
      {!loading && (
        <Row>
          {addresses.map((address: any) => (
            <Col sm={4} key={address.id}>
              <Card className={styles.card}>
                <Card.Header
                  as="h4"
                  className={address.id === user.defaultAddressId ? styles.defaultAddrHeader : undefined}>
                  {address.contactPerson + ' ' + address.id}
                </Card.Header>
                <Card.Body>
                  <div>
                    <span>{address.address},</span>
                    <br />
                    <span>{address.city},</span>
                    <br />
                    <span>{address.state},</span>
                    <br />
                    <span>{address.zip}</span>
                  </div>
                </Card.Body>
                <Card.Footer className={address.id === user.defaultAddressId ? styles.defaultAddrFooter : undefined}>
                  {address.id === user.defaultAddressId && (
                    <span>
                      <FaCheck /> Default Address
                    </span>
                  )}
                  {address.id !== user.defaultAddressId && (
                    <Button variant="light" onClick={() => handleSetDefaultAddr(address.id)}>
                      Set as Default
                    </Button>
                  )}
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default ManageAddress
