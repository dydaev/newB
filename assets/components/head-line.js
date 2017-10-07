import React from 'react'

import Button_more from './button-more';

const Head_line = ({title, more}) => {
    const styles = {
        main: {
            position: 'relative',
            width: '100%',
            marginBottom: 5
        },
        line: {
            background: '#cf0000',
            width: '100%',
            height: 3
        },
        more: {
            position: 'absolute',
            marginLeft: '100%',
            left: -61,
            top: 14
        },
        title: {
            fontFamily: 'Franchise-Bold, "Comic Sans MS", cursive',
            textTransform: 'uppercase',
            fontSize: 30,
            marginBottom: -3
        }
    };
    let boxMore
    if ( more) {
        boxMore = <div style={ styles.more }><Button_more link='' /></div>
    }
    return (
        <header style={ styles.main }>
            <h3 style={ styles.title }>{ title }</h3>
            <div style={ styles.line }/>
            { boxMore }
        </header>
    );
}

export default Head_line;