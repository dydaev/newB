import React from 'react'

import { News_review, Img_news_review } from '../components/news-review';
import Head_line from '../components/head-line';
import Dotted_line from '../components/dotted-line';


export default function Block_previews_text4x4({ title, width, height, children, columns = 2}) {

    const styles = {
        section: {
            width: width,
            marginTop: 5,
            marginBottom: 30
        },
        content: {
            display: 'flex',
            height: height,
            flexFlow: 'column wrap',
            justifyContent: 'space-between',
            alignContent: 'space-between',
            marginTop: 25
        }        
    }

    return (
        <section style={ styles.section }>
            <Head_line title={ title } more="dsa"/>
            <div style={ styles.content }>
                {children.map(( child, ind ) => {
                    return (ind % columns) ? 
                    <div key = { ind }>{ child }</div> :
                    <div key = { ind }>{ child }<Dotted_line width= { child.props.width }/></div>
                }
            )}
            </div>
        </section>
    );
}