import React from 'react';


const Review_header = ({ title, fontSize = '14px' }) => {
    const styles = {
        height: '2em',
        overflow: 'hidden',
        fontWeight: 800,
        fontSize: fontSize,
        textAlign: 'justify',
        marginBottom: 3
    };

    return (
        <header className="review-header">
            <h6 style={styles}>
                {title}
            </h6>
        </header>
    )
};

export default Review_header;