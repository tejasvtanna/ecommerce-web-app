import CSS from 'csstype'
const standard = {
  fontFamily: 'Poppins',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '21px',
  color: '#151515',
  letterSpacing: '.75px',
}
// const small = {
//   ...standard,
//   fontSize: '8px',
// };
const thin = {
  ...standard,
  fontWeight: 300,
  fontSize: '20px',
}
const thinSmall = {
  ...thin,
  fontSize: '14px',
}
const bold = {
  ...standard,
  fontWeight: 800,
}
const boldlarge = {
  ...bold,
  fontSize: '20px',
}
const logo = {
  fontFamily: 'Pangolin',
  fontStyle: 'normal',
  fontWeight: 200,
  fontSize: '24px',
  lineHeight: '29px',
  color: '#000000',
}
const banner = {
  ...logo,
  color: '#ffffff',
}
const productTitle = {
  ...standard,
  fontWeight: 300,
  fontSize: '30px',
  lineHeight: '48px',
}
export const getStyle = (variant?: string, customStyle?: CSS.Properties): CSS.Properties => {
  switch (variant) {
    case 'bold':
      return { ...bold, ...customStyle }
    case 'logo':
      return { ...logo, ...customStyle }
    case 'thin':
      return { ...thin, ...customStyle }
    case 'banner':
      return { ...banner, ...customStyle }
    case 'productTitle':
      return { ...productTitle, ...customStyle }
    case 'thinSmall':
      return { ...thinSmall, ...customStyle }
    case 'boldlarge':
      return { ...boldlarge, ...customStyle }

    default:
      return { ...standard, ...customStyle }
  }
}
