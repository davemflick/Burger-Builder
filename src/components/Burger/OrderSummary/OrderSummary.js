import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map(ing => {
    if (props.ingredients[ing] > 0) {
      return <li key={ing}><span style={{textTransform: "capitalize"}}>{ing}</span>: {props.ingredients[ing]}</li>;
    }
    return null;
  });
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious with the following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p><strong>Total Price: {props.totalPrice}</strong></p>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger" click={props.cancel}>CANCEL</Button>
      <Button btnType="Success" click={props.continue}>CONTINUE</Button>
    </Aux>
  );
};

export default orderSummary;