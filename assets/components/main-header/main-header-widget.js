import React from 'react';

export default function Main_header_widget({children}) {

    return (
        <div id="heade-widget">
            <ul>
                {children.map( child => child )}
            </ul>
        </div>
    );
}