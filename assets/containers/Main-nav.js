import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import { login as actions }  from '../actions'

import { Nav, Navbar, NavItem, NavLink } from 'reactstrap';

import MainHeader from './header/';

class Main_nav extends React.Component {
    constructor(props) {
      super(props);
      this.Dispatcher = this.props.Dispatcher;

      if (!props.Store.login.isLogin) {
        this.Dispatcher(actions.logged_check());
      }
    }
    render() {
      return (
        <div>
            <MainHeader/>
            <Navbar color="dark"  className="navbar-dark main-nav">
                <Nav navbar>
                  <NavItem>
                    <NavLink href="#" onClick={() => browserHistory.push('/world')}>world news</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="#" onClick={() => browserHistory.push('/sport')}>sport</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="#" onClick={() => browserHistory.push('/tech')}>tech</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="#" onClick={() => browserHistory.push('/busines')}>busines</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="#" onClick={() => browserHistory.push('/movies')}>movies</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="#" onClick={() => browserHistory.push('/culture')}>culture</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="#" onClick={() => browserHistory.push('/books')}>books</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="#" onClick={() => browserHistory.push('/blogs')}>blogs</NavLink>
                  </NavItem>
                </Nav>
            </Navbar>
            <div style={{ marginTop: '5px' }}>{this.props.children}</div>
        </div>
      )
    }
}
export default connect(
    ( store ) => ({ Store: store }),
    dispatch => ({Dispatcher: dispatch})
)(Main_nav)
