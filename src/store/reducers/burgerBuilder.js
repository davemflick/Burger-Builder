import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
}

const initialState = {
  ingredients: null,
  price: 4,
  error: false
}

const addIngredient = (curState, action) => {
  const updatedIngredient = updateObject({[action.ingredientName]: curState.ingredients[action.ingredientName] + 1});
  const updatedIngredients = updateObject(curState.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    price:  curState.price + INGREDIENT_PRICES[action.ingredientName],
  }
  return updateObject(curState, updatedState);
}

const setIngredients = (curState, action) => {
  return updateObject(curState, {
    ingredients: action.ingredients,
    price: 4,
    error: false,
  });
}

const removeIngredient = (curState, action) => {
  const updatedIng = updateObject({[action.ingredientName]: curState.ingredients[action.ingredientName] - 1});
  const updatedIngs = updateObject(curState.ingredients, updatedIng);
  const newState = {
    ingredients: updatedIngs,
    price:  curState.price - INGREDIENT_PRICES[action.ingredientName],
  }
  return updateObject(curState, newState);
}

const reducer = (curState = initialState, action) => {
  switch(action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(curState, action);
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(curState, action);
    case actionTypes.SET_INGREDIENTS:
      return setIngredients(curState, action)
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return updateObject(curState, {error: true});
    default:
      return curState;
  }

}

export default reducer;