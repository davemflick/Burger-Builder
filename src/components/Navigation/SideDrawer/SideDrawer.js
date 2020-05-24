import React from 'react';
import classes from './SideDrawer.module.css';

import Aux from '../../../hoc/Aux'
import Logo from '../../Logo/Logo';
import Backdrop from '../../UI/Backdrop/Backdrop';
import NavigationItems from '../NavigationItems/NavigationItems';

const sideDrawer = (props) => {
  return (
    <Aux>
      <Backdrop show={props.open} click={props.toggle} />
      <div className={[classes.SideDrawer, props.open ? classes.Open : classes.Close].join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;