import React from 'react'

import { News_review, Img_news_review } from '../components/news-review';
import Head_line from '../components/head-line';


export default function Block_previews({ title, width, height = 'auto', children, more, padding, margin = '5px 0 0' }) {

    const styles = {
        section: {
            width: width,
            margin: margin,
            marginBottom: 30
        },
        content: {
            display: 'flex',
            height: height,
            justifyContent: 'space-between',
            alignContent: 'space-between',
            flexFlow: 'row wrap',
            marginTop: 10,
            padding: padding
        }        
    }

    return (
        <section style={ styles.section }>
            <Head_line title={ title } link={ more }/>
            <div style={ styles.content }>
                {children.map(child => child)}
            </div>
        </section>
    );
}