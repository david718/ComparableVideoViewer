import * as React from 'react';
import styled from 'styled-components';

const SHeader = styled.div`
  border-bottom: 2px solid gainsboro;
`;

const SAppName = styled.span`
  float: right;
  margin: 18px;

  font-size: 32px;
  font-weight: bold;
`;

const SLogo = styled.img`
  height: 48px;
  margin: 10px;
`;

const Header = () => {
  return (
    <SHeader>
      <SLogo src="https://hsr.hodooai.com/65be2cded0bdea02eb7ba91b8f246b69.png" />
      <SAppName>AnimationSR</SAppName>
    </SHeader>
  );
};

export default Header;
