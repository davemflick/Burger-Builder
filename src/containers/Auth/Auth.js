import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner'
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Auth extends Component {
  state = {
    authForm: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Mail Address'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    formIsValid: true,
    isSignUp: true,
  }

  componentDidMount() {
    if (!this.props.building) {
      this.props.onSetAuthRedirectPath();
    }
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
    const form = {
      ...this.state.authForm,
      [input]: {
        ...this.state.authForm[input],
        value: e.target.value,
        valid: this.checkValidity(e.target.value, this.state.authForm[input].validation),
        touched: true,
      },
    };

    // let formIsValid = true;
    // for (let inputIdentifier in form) {
    //   formIsValid = form[inputIdentifier].valid && formIsValid;
    // }
    this.setState({authForm: form});
  }

  submitHandler = (e) => {
    e.preventDefault();
    if (!this.state.formIsValid) {
      return;
    }
    this.props.onAuth(this.state.authForm.email.value, this.state.authForm.password.value, this.state.isSignUp)
  }

  switchAuthModeHandler = () => {
    this.setState((prevState, props) => ({isSignUp: !prevState.isSignUp}));
  }

  render() {
    const inputs = Object.keys(this.state.authForm).map(input => {
      const details = {...this.state.authForm[input]}
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
      <form onSubmit={this.submitHandler}>
        {inputs}
        <Button btnType="Success" disabled={!this.state.formIsValid}>Submit</Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }

    let errorMsg = null;
    if( this.props.error ){
      errorMsg = (
        <p>{this.props.error.message}</p>
      )
    }

    let auth = null;
    if (this.props.isAuthenticated) {
      auth = <Redirect to={this.props.authRedirectPath} />;
    }
    return (
      <div className={classes.Auth}>
        {auth}
        {form}
        {errorMsg}
      <Button
        btnType="Danger"
        click={this.switchAuthModeHandler}
      >Swith to Sign {this.state.isSignUp ? 'In' : 'Up'}</Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token != null,
    authRedirectPath: state.auth.authRedirectPath,
    building: state.burgerBuilder.building,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);