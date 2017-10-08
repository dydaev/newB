import React from 'react';

const Button_more = ({ link = '' }) => {
    const styles = {
        display: 'block',
        paddingTop: 2,
        paddingLeft: 5,
        background: '#cf0000',
        width: 61,
        height: 19,
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 10
    }

    return <a style={ styles } href={link + "#"}>MORE +</a>
}

export default Button_more;