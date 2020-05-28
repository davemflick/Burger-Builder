import React, { Component } from "react";
import { Route } from 'react-router-dom';
import Summary from '../../components/Order/Summary/Summary';
import Contact from '../Contact/Contact';


class Checkout extends Component {
  state = {
    ingredients: {},
    totalPrice: 0,
  }

  componentDidMount(){
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    for(let param of query.entries()) {
      if(param[0] === 'price') {
        this.setState({totalPrice: param[1]});
      } else {
        ingredients[param[0]] = Number(param[1]);
      }
    }
    this.setState({ingredients: ingredients})
  }

  onCancelHandler = () => {
    this.props.history.goBack();
  };

  onContinueHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  
  render() {
    return (
      <div>
        <Summary
          ingredients={this.state.ingredients}
          cancel={this.onCancelHandler}
          continue={this.onContinueHandler} />
          <Route
            path={`${this.props.match.path}/contact-data`}
            render={(props) => <Contact ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />} />
      </div>
    );
  }
}

export default Checkout;