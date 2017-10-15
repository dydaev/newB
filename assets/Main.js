import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

import React from 'react';
import thunk from 'redux-thunk'
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import * as reducers from './reducers';
import Main_nav from './containers/Main-nav';

import * as Pages from './pages';

const reducer = combineReducers({
    ...reducers,
    routing: routerReducer
})

const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk)));

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
    <Provider store={store}>
        <div>
            <Router history={history}>
                <Route path="/" component={Main_nav}>
                    <IndexRoute component={Pages.Home}/>
                    <Route path="/" component={Pages.Home}/>
                    <Route path="login" component={Pages.Login}/>
                    <Route path="profile" component={Pages.Profile}/>
                    <Route path="world" component={Pages.Public.World}/>
                    <Route path="sport" component={Pages.Public.Sport}/>
                    <Route path="tech" component={Pages.Public.Tech}/>
                    <Route path="busines" component={Pages.Public.Busines}/>
                    <Route path="movies" component={Pages.Public.Movies}/>
                    <Route path="culture" component={Pages.Public.Culture}/>
                    <Route path="books" component={Pages.Public.Books}/>
                    <Route path="blogs" component={Pages.Public.Blogs}/>
                    <Route path="news" component={Pages.Public.News}/>
                    <Route path="staff/super" component={Pages.Staff.Super}/>
                    <Route path="staff/admin" component={Pages.Staff.Admin}/>
                    <Route path="staff/publisher" component={Pages.Staff.Publisher}/>
                    <Route path="staff/writer" component={Pages.Staff.Writer}/>
                </Route>
            </Router>
        </div>
    </Provider>,
    document.getElementById('root')
)
