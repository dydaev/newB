import React from 'react';

export default function Img_gallery_preview({src, link, width}){
    const styles = {
        block: {
            display: 'block',
            width: width
        },
        img: {
            width: '100%',
            height: 100
        }
    }
    return (
        <a style={ styles.block } href={ link }>
            <img style={ styles.img } src={ src }/>
        </a>
    );
}