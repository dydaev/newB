import React from 'react';

import Button_more from '../../button-more'

export default function Aside_vide_preview({ children, margin }) {
    const styles = {
        body: {
            background: '#983a15',
            position: 'relative',
            padding: '9px 20px',
            width: 250,
            height: 316,
            margin: margin
        },
        row: {
            height: 55
        },
        footer: {
            marginLeft: '-61px',
            marginTop: '-12px',
            position: 'absolute',
            left: '100%',
            right: '100%',
        }
    }
    return (
        <section className="main-aside-videopreview" style={ styles.body }>
            <div>
                { children.map( child => child) }
            </div>
            <footer style={ styles.footer }>
                <Button_more link="#"/>
            </footer>
        </section>
    )
}