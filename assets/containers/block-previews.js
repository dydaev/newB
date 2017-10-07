import React from 'react'

import { News_review, Img_news_review } from '../components/news-review';
import Head_line from '../components/head-line';


export default function Block_previews({ title, width, children }) {

    const styles = {
        section: {
            width: width,
            marginTop: 5,
            marginBottom: 30
        },
        content: {
            display: 'flex',
            justifyContent: 'space-between',
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