import React from 'react';

interface Props {
  test: boolean;
  children: React.ReactElement;
}

const If: React.FC<Props> = ({ test, children }) => (test ? <>{children}</> : <></>);

export default If;
