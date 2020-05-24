import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import classes from './Layout.module.css';

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
        <Toolbar toggleSideDrawer={this.sideDrawerHandler} />
        <SideDrawer open={this.state.showSideDrawer} toggle={this.sideDrawerHandler} />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    )
  }
};

export default Layout;