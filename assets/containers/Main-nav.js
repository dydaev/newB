import React from 'react'
import { browserHistory } from 'react-router'

import { Nav, Navbar, NavItem, NavLink } from 'reactstrap';

import MainHeader from './header';

export default function Main_nav({ children }) {
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
          <div style={{ marginTop: '1.5em' }}>{children}</div>
      </div>
    )
}
//<button onClick={() => browserHistory.push('/foo')}>Go to /foo</button>