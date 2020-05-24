import React, {Component} from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(ing => {
      if (this.props.ingredients[ing] > 0) {
        return <li key={ing}><span style={{textTransform: "capitalize"}}>{ing}</span>: {this.props.ingredients[ing]}</li>;
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
        <p><strong>Total Price: {this.props.totalPrice}</strong></p>
        <p>Continue to Checkout?</p>
        <Button btnType="Danger" click={this.props.cancel}>CANCEL</Button>
        <Button btnType="Success" click={this.props.continue}>CONTINUE</Button>
      </Aux>
    );
  }
};

export default OrderSummary;