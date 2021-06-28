import React, { useState } from 'react'
import { Modal, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useAuth } from 'contexts/AuthContext'
import { addressActions } from 'redux/actions'
import { Button } from 'components/atoms/Buttons'

interface Props {
  setShowModal: any
}

const AddAddress = ({ setShowModal }: Props) => {
  const dispatch = useDispatch()
  const { currentUser } = useAuth()
  const [contactPerson, setContactPerson] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zip, setZip] = useState('')

  const handleSubmit = (e: any) => {
    e.preventDefault()

    const addressObj = { userId: currentUser.uid, contactPerson, address, city, state, zip }
    dispatch(addressActions.addAddress(addressObj))

    setShowModal(false)
  }

  return (
    <Modal show={true} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Address</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group className="mb-3">
            <Form.Label>Contact Person</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter contact person name"
              value={contactPerson}
              onChange={(e) => setContactPerson(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>City</Form.Label>
            <Form.Control type="text" placeholder="Enter city" value={city} onChange={(e) => setCity(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter state"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Zip</Form.Label>
            <Form.Control type="text" placeholder="Enter zip" value={zip} onChange={(e) => setZip(e.target.value)} />
          </Form.Group>
          <Button type="submit" disabled={!contactPerson || !address || !city || !state || !zip}>
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default AddAddress
