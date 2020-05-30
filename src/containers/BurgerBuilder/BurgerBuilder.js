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
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false,
  }

  componentDidMount() {
    // axios.get('https://react-course-eec87.firebaseio.com/ingredients.json')
    //   .then(response => {
    //     this.setState({ingredients: response.data})
    //   }).catch(error => {
    //     console.log(error);
    //     this.setState({error: true});
    //   });
  }

  updatePurchaseState(ingredients) {
    return Object.keys(ingredients).reduce((total, ing) => {
      return total + ingredients[ing];
    }, 0) >= 1; 
  }

  togglePurchasingHandler = () => {
    this.setState(prevState => {
      return {purchasing: !prevState.purchasing};
    });
  }

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout');
  }

  render() {
    const  disableInfo = {...this.props.ings};
    for(let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = <Spinner />;

    if(this.state.error) {
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

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.price,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredient: (name) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: name}),
    onRemoveIngredient: (name) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: name}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));