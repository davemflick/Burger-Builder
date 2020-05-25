import React, { Component } from 'react';
import axios from '../../axios-orders';
import Aux from '../../hoc/Aux/Aux';
//Components
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
}

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  }

  componentDidMount() {
    axios.get('https://react-course-eec87.firebaseio.com/ingredients.json')
      .then(response => {
        this.setState({ingredients: response.data})
      }).catch(error => {
        console.log(error);
        this.setState({error: true});
      });
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
    this.setState({loading: true});
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'David Flick',
        address: {
          street: 'TestStreet',
          zipCode: '12345',
          country: 'USA'
        },
        email: 'yoyoyo@yoyo.com',
      },
      deliveryMethod: 'fastest'
    }

    axios.post('/orders.json', order)
      .then(response => {
        console.log(response);
        this.setState({loading: false, purchasing: false});
      }).catch(error => {
        console.log(error);
        this.setState({loading: false, purchasing: false});
      });
  }

  render() {
    const  disableInfo = {...this.state.ingredients};
    for(let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = <Spinner />;

    if(this.state.error) {
      burger = <p>Ingredients can't be loaded</p>;
    }

    if(this.state.ingredients) {
      burger =(
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
        </Aux>
      );
      orderSummary = <OrderSummary
        ingredients={this.state.ingredients}
        cancel={this.togglePurchasingHandler}
        continue={this.purchaseContinuteHandler}
        totalPrice={this.state.totalPrice.toFixed(2)}
      />;
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        {burger}
        <Modal show={this.state.purchasing} toggle={this.togglePurchasingHandler}>
          {orderSummary}
        </Modal>
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);