import React from 'react';
import classes from './DrawerToggle.module.css';


const drawerToggle = (props) => (
  <button className={classes.DrawerToggle} onClick={props.click}>
    <span></span>
    <span></span>
    <span></span>
  </button>
);

export default drawerToggle;