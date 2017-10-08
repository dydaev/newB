import React from 'react';

export default function Aside_movie_line({ text, link, width = '100%', margin='16px 0' }) {
    const styles = {
        body:{
            width: width,
            height: 55,
            margin: margin 
        },
        icon:{
            body: {
                display: 'inline-flex',
                justifyContent: 'center',
                alignItems: 'center',
                flex: '1 0 68px',
                width: 68,
                height: '100%',
                background: '#cf0000'
            },
            triangle: {
                width: 0,
                height: 0,
                marginLeft: '6px',
                borderStyle: 'solid',
                borderWidth: '8px 0 8px 13px',
                borderColor: 'transparent transparent transparent #202021',
            }
        },
        text:{
            display: 'inline-block',
            padding: '5px 10px',
            height: '4.3em',
            marginBottom: 0,
            overflow: 'hidden',
            lineHeight: '15px',
            flex: '2 1 auto',
            fontSize: '12px',
            fontWeight: 'bold'
        }
    }
    return (
        <div style={ styles.body }>
            <a href={ link } style={{ display: 'inline-flex', width: '100%', height: '100%' }}>
                <div style={ styles.icon.body }><div style={ styles.icon.triangle }/></div>
                <p style={ styles.text}> { text } </p>
            </a>
        </div>
    )
}