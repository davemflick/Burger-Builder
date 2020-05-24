import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
//Components
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
  }

  updatePurchaseState(ingredients) {
    return Object.keys(ingredients).reduce((total, ing) => {
      return total + ingredients[ing];
    }, 0) >= 1; 
  }

  addIngredientHandler = (type) => {
    const ingredients = {...this.state.ingredients}
    ingredients[type] += 1;
    const totalPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({ingredients, totalPrice, purchasable: true});
  }

  removeIngredientHandler = (type) => {
    const ingredients = {...this.state.ingredients}
    const oldCount = ingredients[type];
    if (oldCount > 0) {
      ingredients[type] -= 1;
      const totalPrice = this.state.totalPrice - INGREDIENT_PRICES[type]
      this.setState({
        ingredients,
        totalPrice,
        purchasable: this.updatePurchaseState(ingredients)
      });
    }
  }

  togglePurchasingHandler = () => {
    this.setState(prevState => {
      return {purchasing: !prevState.purchasing};
    });
  }

  purchaseContinuteHandler = () => {
    console.log('Continue Purchase');
  }

  render() {
    const  disableInfo = {...this.state.ingredients};
    for(let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          add={this.addIngredientHandler}
          remove={this.removeIngredientHandler}
          disabled={disableInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          purchasing={this.togglePurchasingHandler}
        />
        <Modal show={this.state.purchasing} toggle={this.togglePurchasingHandler}>
          <OrderSummary
            ingredients={this.state.ingredients}
            cancel={this.togglePurchasingHandler}
            continue={this.purchaseContinuteHandler}
            totalPrice={this.state.totalPrice.toFixed(2)}
          />
        </Modal>
      </Aux>
    );
  }
}

export default BurgerBuilder;