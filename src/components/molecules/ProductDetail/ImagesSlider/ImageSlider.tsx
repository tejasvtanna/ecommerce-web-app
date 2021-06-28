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
              {imagesRandom.map((img: string, index: number) => (
                <Carousel.Item key={index} style={{ maxHeight: '35rem' }}>
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
          imagesRandom.map((img: string, index: number) => (
            <Col key={index}>
              <img
                className={`d-block w-100 ${styles.img}`}
                src={img}
                alt="Product Image"
                onClick={() => handleSelect(index)}
              />
            </Col>
          ))}
      </Row>
    </Container>
  )
}
