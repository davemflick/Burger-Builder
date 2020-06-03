import React, {Component} from 'react';
import Aux from '../Aux/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import classes from './Layout.module.css';
import { connect } from 'react-redux';

class Layout extends Component {

  state = {
    showSideDrawer: false
  }
  
  sideDrawerHandler = () => {
    this.setState(prevState => {
      return { showSideDrawer: !prevState.showSideDrawer};
    });
  }

  render(){
    return (
      <Aux>
        <Toolbar toggleSideDrawer={this.sideDrawerHandler} isAuth={this.props.isAuthenticated} />
        <SideDrawer open={this.state.showSideDrawer} isAuth={this.props.isAuthenticated} toggle={this.sideDrawerHandler} />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    )
  }
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(Layout);