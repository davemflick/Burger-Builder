import React from 'react';
import classes from './Order.module.css';

const order = (props) => (
  <div className={classes.Order}>
    <p>Ingredients: {props.ingredients}</p>
    <p>Price: {props.price}</p>
  </div>
);

export default order;