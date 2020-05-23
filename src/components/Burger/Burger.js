import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import BurgerBuilder from '../../containers/BurgerBuilder/BurgerBuilder';

const Burger = (props) => {
  return (
    <div>
      <BurgerIngredient />
    </div>
  )
}

export default Burger;