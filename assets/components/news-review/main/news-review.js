import React, { PropTypes } from 'react';

import Review_header from '../header';
import Review_footer from '../footer';
import Review_content from '../content';

const News_review = ({ title, text, author, comments, newsId, addedAt, width }) => {
    const styles = {
        height: 100,
        width: width
    }

    return (
        <article style={ styles }>
            <Review_header title={ title } fontSize='14px'/>
            <Review_content text={ text } fontSize = '13px'/>
            <Review_footer 
                author={ author } 
                comments={ comments }
                newsId={ newsId }
                addedAt={ addedAt }
                fontSize = '12px'/>
        </article>
    )
}

News_review.PropTypes = {
    title : React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired,
    author: React.PropTypes.string,
    comments: React.PropTypes.number,
    newsId: React.PropTypes.number,
    addedAt: React.PropTypes.number
}

export default News_review;