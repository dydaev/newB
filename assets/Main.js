import { Nav, Navbar, NavItem, MenuItem } from 'react-bootstrap';

import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import * as reducers from './reducers'
import { App, Home, Foo, Bar } from './components'

const reducer = combineReducers({
    reducers,
    routing: routerReducer
})

const DevTools = createDevTools(
    <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
        <LogMonitor theme="tomorrow" preserveScrollTop={false} />
    </DockMonitor>
)

const store = createStore(
    reducer,
    DevTools.instrument()
)
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
    <Provider store={store}>
        <div>
            <Router history={history}>
                <Route path="/" component={App}>
                    <IndexRoute component={Home}/>
                    <Route path="foo" component={Foo}/>
                    <Route path="bar" component={Bar}/>
                </Route>
            </Router>
            <DevTools />
        </div>
    </Provider>,
    document.getElementById('root')
)

// const NavbarInstance = () => (
//   <Navbar inverse collapseOnSelect>
//     <Navbar.Collapse>
//       <Nav>
//           <a eventKey={1} class="navbar-brand" href="#">world news</a>
//           <a eventKey={2} class="navbar-brand" href="#">sports</a>
//           <a eventKey={3} class="navbar-brand" href="#">tech</a>
//           <a eventKey={4} class="navbar-brand" href="#">busines</a>
//           <a eventKey={5} class="navbar-brand" href="#">movies</a>
//           <a eventKey={6} class="navbar-brand" href="#">culture</a>
//           <a eventKey={7} class="navbar-brand" href="#">books</a>
//           <a eventKey={8} class="navbar-brand" href="#">blogs</a>
//       </Nav>
//     </Navbar.Collapse>
//   </Navbar>
// );