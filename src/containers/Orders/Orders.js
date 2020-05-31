import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from  '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

class Orders extends Component {

  componentDidMount() {
    this.props.onFetchOrders();
  }

  render() {
    let orders = <Spinner />;
    if (!this.props.loading && this.props.orders) {
      orders = this.props.orders.map(order => {
        let ingredients = null;
        if (order.ingredients) {
          console.log(order)
          ingredients = Object.keys(order.ingredients).map(ing => `${ing}: (${order.ingredients[ing]})`).join(' ');
        }
        return <Order key={order.key || order.id} ingredients={ingredients} price={order.price} />
      })
    }
    return (
      <div>
        {orders}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return  {
    orders: state.order.orders,
    loading: state.order.loading,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: () => dispatch(actions.fetchOrders())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));