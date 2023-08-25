import { Card, Table } from 'react-bootstrap'
import { BsCardList } from 'react-icons/bs'
import { MdLocalOffer, MdLocalShipping } from 'react-icons/md'
import { HiReceiptTax } from 'react-icons/hi'
import { BiRupee } from 'react-icons/bi'

import styles from './CartSummary.module.css'

interface Props {
  total: number
  discount: number
  deliveryCharge: number
  gst: number
  netPayableAmt: number
}

export const CartSummary = ({ total, discount, deliveryCharge, gst, netPayableAmt }: Props) => {
  return (
    <div>
      <Card className={styles.card}>
        <Card.Header as="h4">Cart Total</Card.Header>
        <Card.Body>
          <Table hover className={styles.table}>
            <tbody>
              <tr>
                <td style={{ width: '10%' }}>
                  <BsCardList className={styles.icon} />
                </td>
                <td className={styles.heading}>Total</td>
                <td>₹ {total}</td>
              </tr>
              <tr>
                <td>
                  <MdLocalOffer className={styles.icon} />
                </td>
                <td className={styles.heading}>Discount Applied</td>
                <td>₹ {discount}</td>
              </tr>
              <tr>
                <td>
                  <HiReceiptTax className={styles.icon} />
                </td>
                <td className={styles.heading}>GST</td>
                <td>₹ {gst}</td>
              </tr>
              <tr>
                <td>
                  <MdLocalShipping className={styles.icon} />
                </td>
                <td className={styles.heading}>Delivery Charge</td>
                <td>₹ {deliveryCharge}</td>
              </tr>
              <tr>
                <td>
                  <BiRupee className={styles.icon} />
                </td>
                <td className={styles.heading}>Net Payabl Amount</td>
                <td>₹ {netPayableAmt}</td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  )
}
