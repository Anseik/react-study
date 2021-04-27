import classes from '*.module.css';
import React from 'react';

const Layout = ({ children }) => {
  return (
    <div>
      <div className={classes.page}>
        { children }
      </div>
    </div>
  );
};

export default Layout;