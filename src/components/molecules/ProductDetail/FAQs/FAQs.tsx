import React, { useEffect, useState } from 'react'
import { Container, Accordion, Card, Row, Col } from 'react-bootstrap/'
import api from 'services/api'
import { urlConst } from 'utilities/constants'
import FadingLoader from 'components/atoms/Loaders/FadingLoader'
import styles from './FAQs.module.css'

interface Props {
  productId: number
}

export const FAQs: React.FC<Props> = ({ productId }: Props) => {
  const [loading, setLoading] = useState(false)
  const [faqs, setFaqs] = useState([])

  useEffect(() => {
    const getFAQs = () => {
      setLoading(true)
      api
        .get(urlConst.FAQS + `?productId=${productId}`)
        .then((res) => {
          setFaqs(res.data)
          setLoading(false)
        })
        .catch((err) => {
          console.error(err.toString())
          setLoading(false)
        })
    }

    getFAQs()
  }, [productId])

  return (
    <Container>
      <Row>
        <Col>{faqs.length > 0 && <h2>Frequently Asked Questions</h2>}</Col>
      </Row>
      <Row>
        <br />
      </Row>
      <Row>
        <Col>
          {loading && <FadingLoader />}
          {!loading && (
            <Accordion>
              {faqs.map((faq: any) => (
                <Card key={faq.id} className={styles.card}>
                  <Accordion.Toggle
                    className={styles.accHeader}
                    as={Card.Header}
                    variant="link"
                    eventKey={faq.id.toString()}>
                    {faq.question}
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey={faq.id.toString()}>
                    <Card.Body>{faq.answer}</Card.Body>
                  </Accordion.Collapse>
                </Card>
              ))}
            </Accordion>
          )}
        </Col>
      </Row>
    </Container>
  )
}
