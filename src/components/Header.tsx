import * as React from 'react';
import { SHeader, SAppName, SLogoImg } from '../styled';

const Header = () => {
  return (
    <SHeader>
      <SLogoImg src="https://hsr.hodooai.com/65be2cded0bdea02eb7ba91b8f246b69.png" />
      <SAppName>AnimationSR</SAppName>
    </SHeader>
  );
};

export default Header;
