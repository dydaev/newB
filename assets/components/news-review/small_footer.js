import React from 'react';


const Review_footer = ({ author = 'imcognito', comments = 0 , fontSize = '10px'}) => {
    
    const prestyle = {
        display: 'inline-block',
        fontWeight: '200',
        fontSize: fontSize,
        paddingLeft: 5,
    };
    const styles = {
        footer: {
            width: '100%',
            lineHeight: '.8'
        },
        author: {
            ...prestyle,
            paddingLeft: 0,
        },
        line: {
            display: 'inline-block',
            fontSize: prestyle.fontSize,
            paddingLeft: prestyle.paddingLeft,
        },
        comments: {
            ...prestyle,
        },
        p: {
            marginBottom: 0
        }
    };

    return (
        <footer className="review-footer" style={ styles.footer }>
            <div style={ styles.author }>
                <p style={ styles.p }>by <span style={{ color: 'red'}}>{author}</span> </p>
            </div>
            <div style={ styles.line }>|</div>
            <div style={ styles.comments }>
                <p style={ styles.p }> {comments} comments</p>
            </div>
        </footer>
    )
};

export default Review_footer;