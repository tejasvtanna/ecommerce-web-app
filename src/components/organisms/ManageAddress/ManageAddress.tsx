import { useEffect, useState } from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import { addressActions, userActions } from 'redux/actions'
import { useSelector, useDispatch } from 'react-redux'
import { FaCheck } from 'react-icons/fa'
import styles from './ManageAddress.module.css'
import { useAuth } from 'contexts/AuthContext'
import AddEditAddress from 'components/molecules/Address/AddAddress/AddEditAddress'
import { Button } from 'components/atoms/Buttons'
import FadingLoader from 'components/atoms/Loaders/FadingLoader'

const ManageAddress = () => {
  const dispatch = useDispatch()
  const { currentUser } = useAuth()
  const loading = useSelector((state: any) => state.addresses.loading)
  const addresses = useSelector((state: any) => state.addresses.list)
  const { user } = useSelector((state: any) => state.user)
  const [showModal, setShowModal] = useState(false)
  const [editIdx, setEditIdx] = useState(-1)

  useEffect(() => {
    dispatch(addressActions.getAddressesByUser(currentUser.uid))
  }, [dispatch, currentUser.uid])

  const handleSetDefaultAddr = (e: any, id: number) => {
    e.stopPropagation()

    const updatedUser = { ...user, defaultAddressId: id }
    dispatch(userActions.changeDefaultAddress(updatedUser))
  }

  const handleAddAddress = () => {
    setEditIdx(-1)
    setShowModal(true)
  }

  const handleEditAddress = (editIdx: number) => {
    setEditIdx(editIdx)
    setShowModal(true)
  }

  return (
    <>
      <Row>
        <Col sm={10}></Col>
        <Col>
          <Button customStyle={{ float: 'right' }} onClick={handleAddAddress}>
            Add Address
          </Button>
        </Col>
      </Row>
      <Row>
        {showModal && (
          <AddEditAddress setShowModal={setShowModal} addressToEdit={editIdx >= 0 ? addresses[editIdx] : null} />
        )}
      </Row>
      <Row>
        <div>
          <br />
        </div>
        {loading && <FadingLoader />}
      </Row>
      {!loading && (
        <Row>
          {addresses.map((address: any, idx: number) => (
            <Col sm={4} key={address.id}>
              <Card className={styles.card} onClick={() => handleEditAddress(idx)}>
                <Card.Header
                  as="h4"
                  className={address.id === user.defaultAddressId ? styles.defaultAddrHeader : undefined}>
                  {address.contactPerson}
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
                    <Button variant="light" onClick={(e: any) => handleSetDefaultAddr(e, address.id)}>
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
