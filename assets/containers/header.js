import React from 'react';

import MainMenu from '../components/main-header/main-menu.js';
import MainLogo from '../components/main-header/main-logo.js';

import MainWeathe from '../components/main-header/main-weathe.js';
import ExchangeRaitersMain from '../components/main-header/main-raiters.js';

export default function MainHeader() {
    return (
        <header id="main">
            <MainLogo/>
            <MainMenu/>
            <div id="main-header-widgets">
                <MainWeathe/>
                <ExchangeRaitersMain/>
            </div>
        </header>
    );
}