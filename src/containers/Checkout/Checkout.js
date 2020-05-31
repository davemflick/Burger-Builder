import React, { Component } from "react";
import { Route, Redirect } from 'react-router-dom';
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
    let summary = <Redirect to="/" />;
    if (this.props.ings) {
      const purchasedRediect = this.props.purchased ? <Redirect to="/" /> : null;
      summary = (
        <div>
          {purchasedRediect}
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
    return summary;
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  }
}

export default connect(mapStateToProps)(Checkout);