import React from 'react'
import { News_review } from '../';

Img_news_review.PropTypes = {
    img : React.PropTypes.string.isRequired,
}
export default function Img_news_review({ img, title, text, newsId, width}) {
    
    const styles = {
        width: '100%',
        height: '100px',
        marginBottom: 16
    }

    return (
        <div style={{ width: width }}>
            <img
                style={ styles }
                src={ img }
            />
            <News_review
                width='100%'
                title={ title } 
                text={ text } 
                newsId={ newsId }
            />
        </div>
    );
}