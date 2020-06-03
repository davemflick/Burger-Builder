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
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  }

  componentDidMount() {
    this.props.setIngredients();
  }

  updatePurchaseState(ingredients) {
    return Object.keys(ingredients).reduce((total, ing) => {
      return total + ingredients[ing];
    }, 0) >= 1; 
  }

  togglePurchasingHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState(prevState => {
        return {purchasing: !prevState.purchasing};
      });
    } else {
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
  }

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  }

  render() {
    const  disableInfo = {...this.props.ings};
    for(let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = <Spinner />;

    if(this.props.error) {
      burger = <p>Ingredients can't be loaded</p>;
    }

    if(this.props.ings) {
      burger =(
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            add={this.props.onAddIngredient}
            remove={this.props.onRemoveIngredient}
            disabled={disableInfo}
            price={this.props.price}
            purchasable={this.updatePurchaseState(this.props.ings)}
            purchasing={this.togglePurchasingHandler}
            isAuth={this.props.isAuthenticated}
          />
        </Aux>
      );
      orderSummary = <OrderSummary
        ingredients={this.props.ings}
        cancel={this.togglePurchasingHandler}
        continue={this.purchaseContinueHandler}
        totalPrice={this.props.price.toFixed(2)}
      />;
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

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.price,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredient: (name) => dispatch(actionCreators.addIngredient(name)),
    onRemoveIngredient: (name) => dispatch(actionCreators.removeIngredient(name)),
    setIngredients: () => dispatch(actionCreators.initIngredients()),
    onInitPurchase: () => dispatch(actionCreators.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actionCreators.setAuthRedirectPath(path)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));