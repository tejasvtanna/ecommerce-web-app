import { useState } from 'react'
import { Container, Carousel, Row, Col } from 'react-bootstrap/'
import styles from './ImageSlider.module.css'

interface Props {
  images: any[]
}

export const ImageSlider: React.FC<Props> = ({ images }: Props) => {
  const [index, setIndex] = useState(0)

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex)
  }

  const imagesRandom = images.map((img: string, idx: number) => `${img}?random${idx}`)

  return (
    <Container>
      <Row>
        <Col>
          {imagesRandom && (
            <Carousel activeIndex={index} onSelect={handleSelect}>
              {imagesRandom.map((img: string, idx: number) => (
                <Carousel.Item key={idx} style={{ maxHeight: '35rem' }}>
                  <img className="d-block w-100" src={img} alt="" />
                </Carousel.Item>
              ))}
            </Carousel>
          )}
        </Col>
      </Row>
      <Row>
        <br />
      </Row>
      <Row>
        {imagesRandom &&
          imagesRandom.map((img: string, idx: number) => (
            <Col key={idx}>
              <img
                className={`d-block w-100 ${styles.img}`}
                src={img}
                alt="Product"
                onClick={() => handleSelect(idx)}
              />
            </Col>
          ))}
      </Row>
    </Container>
  )
}
