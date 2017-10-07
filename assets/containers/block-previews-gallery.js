import React from 'react'

import { News_review, Img_news_review } from '../components/news-review';
import Head_line from '../components/head-line';


export default function Block_previews_gallery({ title, width, height, children }) {

    const styles = {
        section: {
            width: width,
            marginTop: 5,
            marginBottom: 20
        },
        content: {
            display: 'flex',
            height: height,
            justifyContent: 'space-between',
            alignContent: 'space-between',
            flexFlow: 'row wrap',
            marginTop: 10
        }        
    }

    return (
        <section style={ styles.section }>
            <Head_line title={ title } more="dsa"/>
            <div style={ styles.content }>
                {children.map(child => child)}
            </div>
        </section>
    );
}