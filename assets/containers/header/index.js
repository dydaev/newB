import React from 'react';

import MainMenu from '../../components/main-header/main-menu.js';
import MainLogo from '../../components/main-header/main-logo.js';
import Main_header_widget from '../../components/main-header/main-header-widget.js';

import MainWeathe from '../../components/main-header/main-weathe.js';
import ExchangeRaitersMain from '../../components/main-header/main-raiters.js';

export default function MainHeader() {
    return (
        <header id="main">
            <MainLogo/>
            <MainMenu/>
            <Main_header_widget>
                <li>usd: 7.20</li>
                <li>eur: 8.62</li>
                <li>Kyiv +24</li>
                <li>Yalta +31</li>
            </Main_header_widget>
        </header>
    );
}
