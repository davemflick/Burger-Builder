import React, {Component} from 'react';
import Button from '../../components/UI/Button/Button';
import classes from './Contact.module.css';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import { connect } from 'react-redux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

class Contact extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email'
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'},
          ]
        },
        value: 'fastest',
        validation: {},
        valid: true,
      }
    },
    formIsValid: false,
  }

  checkValidity(value, rules) {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  }

  onInputChange = (input, e) => {
    const form = {...this.state.orderForm};
    // Clone Deep
    const formEl = { ...form[input] }
    formEl.value = e.target.value;
    formEl.valid = this.checkValidity(formEl.value, formEl.validation);
    formEl.touched = true;
    form[input] = formEl;

    let formIsValid = true;
    for (let inputIdentifier in form) {
      formIsValid = form[inputIdentifier].valid && formIsValid;
    }
    this.setState({orderForm: form, formIsValid: formIsValid});
  }

  orderHandler = (e) => {
    e.preventDefault();
    if (!this.state.formIsValid) {
      return;
    }
    const formData = {};
    Object.keys(this.state.orderForm).forEach(input => {formData[input] = this.state.orderForm[input].value;});
    const order = {
      ingredients: this.props.ings,
      price: this.props.price.toFixed(2),
      orderData: formData,
      userId: this.props.userId,
    }
    console.log(order);
    this.props.onOrderBurger(order, this.props.token);
  }

  render() {
    const inputs = Object.keys(this.state.orderForm).map(input => {
      const details = {...this.state.orderForm[input]}
      return <Input
        key={input}
        elementtype={details.elementType}
        elementconfig={details.elementConfig}
        value={details.value}
        invalid={!details.valid}
        shouldValidate={details.validation}
        touched={details.touched}
        change={(e) => this.onInputChange(input, e)}
        />
    });

    let form = (
      <form onSubmit={this.orderHandler}>
        {inputs}
        <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
      </form>
    );
    if (this.props.loading) {
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

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.price,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Contact, axios));