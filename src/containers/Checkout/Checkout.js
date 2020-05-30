import React, { Component } from "react";
import { Route } from 'react-router-dom';
import Summary from '../../components/Order/Summary/Summary';
import Contact from '../Contact/Contact';
import { connect } from 'react-redux';


class Checkout extends Component {

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
          ingredients={this.props.ings}
          cancel={this.onCancelHandler}
          continue={this.onContinueHandler} />
          <Route
            path={`${this.props.match.path}/contact-data`}
            component={Contact} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
  }
}

export default connect(mapStateToProps)(Checkout);