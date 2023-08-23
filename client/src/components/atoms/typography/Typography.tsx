import { FunctionComponent } from 'react';
import CSS from 'csstype';
import { getStyle } from './typography.style';

type Props = {
  variant?: string;
  customStyle?: CSS.Properties;
};

const Typography: FunctionComponent<Props> = ({
  customStyle,
  children,
  variant,
}) => {
  return <span style={getStyle(variant, customStyle)}>{children}</span>;
};

export default Typography;
