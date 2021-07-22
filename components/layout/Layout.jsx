import React, { Fragment } from 'react';

import { MainHeader } from './index';

const Layout = ({ children }) => {
  return (
    <Fragment>
      <MainHeader />
      <main>{children}</main>
    </Fragment>
  );
};

export default Layout;
