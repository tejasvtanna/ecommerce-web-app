import ContentLoader from 'react-content-loader'

const Spinner = (props) => (
  <div>
    <ContentLoader
      style={{ position: 'absolute', left: '0', right: '0', top: '0', bottom: '0', margin: 'auto' }}
      height={160}
      width={400}
      backgroundColor="transparent"
      {...props}>
      <circle cx="150" cy="86" r="8" />
      <circle cx="194" cy="86" r="8" />
      <circle cx="238" cy="86" r="8" />
    </ContentLoader>
  </div>
)

export default Spinner
