import React from 'react';

import Img_gallery_preview from './img-gallery';

export default function Img_red_text({ img, text, link, width, margin }) {

    const styles = {
        body: {
            margin: margin,
            width: width
        },
        p:{
            display: 'block', 
            width: '100%',
            height: '3em',
            overflow: 'hidden',
            paddingTop: '7px',
            marginBottom: '10px',
            color: '#cf0000',
            fontWeight: 'bold',
            fontSize: '12px',
            textAlign: 'justify',
            lineHeight: '14px'
        }
    }

    return (
        <div style={ styles.body }>
        <Img_gallery_preview
            src={ link }
            link={ img }
            width='100%'
        />
        <p style={ styles.p }>
            { text }
        </p>
        </div>
    )
}