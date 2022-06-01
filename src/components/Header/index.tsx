import Image from 'next/image';
import NextLink from 'next/link';

import styles from './header.module.scss';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <NextLink href="/">
        <a>
          <Image
            src="/images/logo.svg"
            alt="logo"
            width="238px"
            height="25px"
          />
        </a>
      </NextLink>
    </header>
  );
};

export default Header;
