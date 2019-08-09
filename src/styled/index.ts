import styled from 'styled-components';

export const SAnimList = styled.div`
  margin: 10px;
`;

export const SButtonImg = styled.img`
  vertical-align: middle;
  width: 28px;
  margin-right: 10px;
`;

interface ButtonProps {
  width: number;
}

export const SButton = styled.button<ButtonProps>`
  width: ${props => props.width}px;
  height: 40px;
  margin: 10px;

  border: 1px solid transparent;
  border-radius: 4px;
  background-color: #ff8702;
  color: white;
  font-size: 16px;
  :hover {
    cursor: pointer;
  }
`;

export const SAnimItem = styled.div`
  margin: 10px;
  padding: 10px;

  border: 2px solid transparent;
  border-radius: 4px;
  border-color: white;
  background-color: ${props => (props.defaultChecked ? 'gainsboro' : 'white')};
  font-size: 16px;
  :hover {
    border: 2px solid;
    border-color: gainsboro;
    cursor: default;
  }
  :hover .remove {
    opacity: 1;
  }
`;

export const SRemove = styled.span`
  float: right;

  font-weight: bold;
  color: #e64980;
  opacity: 0;
  :hover {
    cursor: pointer;
  }
`;

export const SComparableVideoViewer = styled.div`
  background-image: url('https://hsr.hodooai.com/5dcc6881b85f662376bf08b591a186bd.png');
  background-size: cover;
`;

export const SHeader = styled.div`
  border-bottom: 2px solid gainsboro;
`;

export const SAppName = styled.span`
  float: right;
  margin: 18px;

  font-size: 32px;
  font-weight: bold;
`;

export const SLogoImg = styled.img`
  height: 48px;
  margin: 10px;
`;

export const STitle = styled.div`
  margin: 10px;

  color: #ff8702;
  font-size: 24px;
`;

export const SAnimTitle = styled.div`
  margin: 10px;

  font-size: 16px;
`;
