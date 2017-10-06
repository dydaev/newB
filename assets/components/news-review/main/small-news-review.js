import React from 'react';

import Review_header from '../header';
import Review_footer from '../small_footer';
import Review_content from '../content';

const Small_news_review = ({}) => {
    const styles = {
        height: 100,
        width: 200
    }

    return (
        <article style={ styles }>
            <Review_header title="Lorem dolor ipsum amet conse ctetur Adipiscing elit, sdsdf rdhgasd ergts setgd" fontSize='14px'/>
            <Review_content text="Nulla quis lorem, tomorrow be black time for everyone who life..." fontSize = '13px'/>
            <Review_footer author="Ludovic XIV" comments="17" fontSize = '12px'/>
        </article>
    )
}

export default Small_news_review;