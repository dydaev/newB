import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import * as reducers from './reducers';
import Main_nav from './components/Main-nav';

import * as Pages from './pages';

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
                <Route path="/" component={Main_nav}>
                    <IndexRoute component={Pages.Home}/>
                    <Route path="/" component={Pages.Home}/>
                    <Route path="world" component={Pages.World}/>
                    <Route path="sport" component={Pages.Sport}/>
                    <Route path="tech" component={Pages.Tech}/>
                    <Route path="busines" component={Pages.Busines}/>
                    <Route path="movies" component={Pages.Movies}/>
                    <Route path="culture" component={Pages.Culture}/>
                    <Route path="books" component={Pages.Books}/>
                    <Route path="blogs" component={Pages.Blogs}/>
                </Route>
            </Router>
        </div>
    </Provider>,
    document.getElementById('root')
)
//            <DevTools />