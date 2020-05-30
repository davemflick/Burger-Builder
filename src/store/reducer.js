import * as actionTypes from './actions';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
}

const initialState = {
  ingredients: {
    meat: 0,
    bacon: 0,
    salad: 0,
    cheese: 0,
  },
  price: 4,
}

const reducer = (curState = initialState, action) => {
  switch(action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...curState,
        ingredients: {
          ...curState.ingredients,
          [action.ingredientName]: curState.ingredients[action.ingredientName] + 1
        },
        price:  curState.price + INGREDIENT_PRICES[action.ingredientName],
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...curState,
        ingredients: {
          ...curState.ingredients,
          [action.ingredientName]: curState.ingredients[action.ingredientName] - 1
        },
        price:  curState.price - INGREDIENT_PRICES[action.ingredientName],
      };
    default:
      return curState;
  }

}

export default reducer;