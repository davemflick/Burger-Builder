import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from  '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  }
  componentDidMount() {
    axios.get('/orders.json')
      .then(res => {
        const orders = Object.keys(res.data).map(order => {
          return {...res.data[order], key: order}
        })
        this.setState({loading: false, orders: orders});
      }).catch(err => {
        this.setState({loading: false});
      });
  }
  render() {
    const orders = this.state.orders.map(order => {
      const ingredients = Object.keys(order.ingredients).map(ing => `${ing}: (${order.ingredients[ing]})`).join(' ');
      return <Order key={order.key} ingredients={ingredients} price={order.price} />
    })
    const outcome = this.state.loading ? <Spinner /> : orders;
    return (
      <div>
        {outcome}
      </div>
    );
  }
}


export default withErrorHandler(Orders, axios);