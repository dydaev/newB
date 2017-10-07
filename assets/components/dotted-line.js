import React from 'react';

export default function Dotted_line({ width = '100%', margin = 0}){
    const styles = {
        margin: margin,
        height: 0,
        width: width,
        padding: '0 3px',
        borderTop: '1px dotted black'
    }
    return (
        <div style={ styles }/>
    )
}