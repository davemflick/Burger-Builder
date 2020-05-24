import React, {Component} from 'react';
import Aux from '../Aux/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
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