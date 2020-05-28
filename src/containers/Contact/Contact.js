import React, {Component} from 'react';
import Button from '../../components/UI/Button/Button';
import classes from './Contact.module.css';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

class Contact extends Component {
  state = {
    contact: {
      name: '',
      email: '',
      address: {
        street: '',
        zipCode: '',
      },
    },
    loading: false,
  }

  onInputChange = (e) => {
    const contact = {...this.state.contact};
    const field = String(e.target.getAttribute('name'));
    if (contact[field] || contact[field] === '') {
      contact[field] = e.target.value;
    } else {
      contact.address[field] = e.target.value;
    }
    this.setState({contact: contact});
  }

  orderHandler = (e) => {
    e.preventDefault();
    this.setState({loading: true});
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: this.state.contact,
      deliveryMethod: 'fastest'
    }

    axios.post('/orders.json', order)
      .then(response => {
        console.log(response);
        this.setState({loading: false, purchasing: false});
        this.props.history.push('/');
      }).catch(error => {
        console.log(error);
        this.setState({loading: false, purchasing: false});
      });
  }

  render() {
    let form = (
      <form>
        <input type="text" name="name" placeholder="Your name" value={this.state.contact.name} onChange={this.onInputChange} />
        <input type="email" name="email" placeholder="Your email" value={this.state.contact.email} onChange={this.onInputChange}  />
        <input type="text" name="street" placeholder="Your street" value={this.state.contact.address.street} onChange={this.onInputChange}  />
        <input type="text" name="zipCode" placeholder="Your Zip Code" value={this.state.contact.address.zipCode} onChange={this.onInputChange}  />
        <Button btnType="Success" click={this.orderHandler}>ORDER</Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    
    return (
      <div className={classes.Contact}>
        <h4>Enter your Contact Information</h4>
        {form}
      </div>
    );
  }
}

export default Contact;