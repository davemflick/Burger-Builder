import React from 'react';
import classes from './NavigationItems.module.css';
import NavItem from './NavItem/NavItem';

const navigationItems = (props) => {
  let auth = <NavItem link="/auth">Authenticate</NavItem>;
  if (props.isAuth) {
    auth = <NavItem link="/logout">Logout</NavItem>
  }
  return (
    <ul className={classes.NavigationItems}>
      <NavItem link="/" active>Burger Builder</NavItem>
      { props.isAuth ? <NavItem link="/orders">Orders</NavItem> : null }
      {auth}
    </ul>
  );
}

export default navigationItems;