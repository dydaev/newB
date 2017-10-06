import React from 'react';


const Review_content = ({ text, fontSize = '12px' }) => {
    const styles = {
        fontWeight: 300,
        fontSize: fontSize,
        textAlign: 'justify',
        lineHeight: '1.2',
        marginBottom: 0
    };

    return (
        <div className="review-content">
            <p style={ styles }>
                { text }
            </p>
        </div>
    )
};

export default Review_content;