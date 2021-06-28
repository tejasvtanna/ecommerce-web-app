import React from 'react';
import Typography from '../../atoms/typography/Typography';
import styles from './footer.module.css';
interface Props {}

const Footer = (props: Props) => {
  return (
    <div className={styles.footer}>
      <div className={styles.footertext}>
        <div className={styles.footertextColumn}>
          <Typography>Get in Touch</Typography>
          <div>
            <Typography>Get in touch</Typography>
          </div>
          <div>
            <Typography>About Us</Typography>
          </div>
          <div>
            <Typography>Blog</Typography>
          </div>
        </div>
        <div className={styles.footertextColumn}>
          <Typography>Connections</Typography>
          <div>
            <Typography>Facebook</Typography>
          </div>
          <div>
            <Typography>Twitter</Typography>
          </div>
        </div>
        <div className={styles.footertextColumn}>
          <Typography>Earnings</Typography>
          <div>
            <Typography>Set in Market</Typography>
          </div>
        </div>
        <div className={styles.footertextColumn}>
          <Typography>Account</Typography>
          <div>
            <Typography>Account</Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
