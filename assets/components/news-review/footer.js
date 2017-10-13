import React, { PropTypes } from 'react';

const Review_footer = ({ author = 'incognito', comments = 0 , fontSize = '10px', newsId, addedAt}) => {
    
    const preStyle = {
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
            ...preStyle,
            paddingLeft: 0,
        },
        line: {
            display: 'inline-block',
            fontSize: preStyle.fontSize,
            paddingLeft: preStyle.paddingLeft,
        },
        comments: {
            ...preStyle,
        },
        p: {
            fontSize: preStyle.fontSize,
            marginBottom: 0
        }
    };
    
    let content;
    if ( addedAt && newsId) {
        let time = Date.now() - addedAt;
        let result;
        const minut = 1000 * 60;
        const hour = minut * 60;

        if (time >= hour * 24) {
            time = Math.ceil((time / hour * 24));
            result = time + " day";
        } else if (time >= hour && time <= hour * 24) {
            time = Math.ceil( time / hour);
            result = time + " hour";
        } else if (time >= minut && time <= hour){
            time = Math.ceil(time / minut);
            result = time + " minut";
        } else if (time <= minut) {
            time = Math.ceil(time / 1000);
            result = time + " second";
        }
        if( time > 1 ) {
            result += "s";
        }
        content = <span style={{ paddingLeft: 15 }}>{ result } ago</span>;
    }
    if ( newsId ) {
        content = (
            <div style={{ paddingTop: 5 }}>
                <p style={ styles.p }>
                    <a
                        style={{ fontWeight: 600 }} 
                        href= "#" 
                        onClick={() => browserHistory.push('/news/id/' + newsId)}
                    >
                        <span style={{ color: 'red'}}>READ MORE</span>
                    </a>
                    { content }
                </p>
            </div>
        );
    }
    if ( ( comments && (addedAt && !newsId) ) || comments) {
        content = (
            <div>
                <div style={ styles.author }>
                    <p style={ styles.p }>by <span style={{ color: 'red'}}>{author}</span> </p>
                </div>
                <div style={ styles.line }>|</div>
                <div style={ styles.comments }>
                    <p style={ styles.p }> {comments} comments</p>
                </div>
            </div>
        );
    }
    
    return (
        <footer className="review-footer" style={ styles.footer }>
            {content}
        </footer>
    )
};

Review_footer.PropTypes = {
    comments: React.PropTypes.number,
    newsId: React.PropTypes.number,
    addedAt: React.PropTypes.number
}

export default Review_footer;