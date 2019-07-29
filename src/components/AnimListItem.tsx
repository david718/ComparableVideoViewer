import * as React from 'react';

interface Props {
  name: string;
}

const AnimListItem: React.SFC<Props> = ({ name }) => {
  return (
    <div>
      <div>{name}</div>
    </div>
  );
};

export default AnimListItem;
