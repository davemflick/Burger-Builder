import React from 'react';
import classes from './Summary.module.css';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const summary = (props) => {
  return (
    <div className={classes.Summary}>
      <h1>We hope it tastes well!</h1>
      <div className={classes.Preview}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="Danger" click={props.cancel}>CANCEL</Button>
      <Button btnType="Success" click={props.continue}>CONTINUE</Button>
    </div>
  );
}

export default summary;