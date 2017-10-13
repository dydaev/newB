import React from 'react'

import Button_more from './button-more';

const Head_line = ({title, doubleTitle, link}) => {
    let styles = {
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
        },
        doubleTitle: {
            color: '#000',
            float: 'right'
        }
    };
    let More

    if ( link && !doubleTitle) {
        
        More = <div style={ styles.more }><Button_more link={ link } /></div>
    
    } else if ( link && doubleTitle) {
        
        styles = Object.assign( styles, {title: { color: '#cf0000'}});
        More = (
            <a href={ link } style={ styles.doubleTitle }>
                <h3 style={ styles.doubleTitle }>{ doubleTitle }</h3>
            </a>
        );
    }

    return (
        <header style={ styles.main }>
            <h3 style={ styles.title }>{ title }</h3>
            <div style={ styles.line }/>
            { More }
        </header>
    );
}

export default Head_line;