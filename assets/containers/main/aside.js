import React from 'react';

import Aside_movie_line from '../../components/news-review/aside-movi-line.js';
import { Button } from 'react-bootstrap';

import Block_previews from '../block-previews';
import Block_previews_gallery from '../block-previews-gallery';
import Block_previews_text4x4 from '../block-previews-text4x4';

import Head_line from '../../components/head-line';
import Button_more from '../../components/button-more';
import Dotted_line from '../../components/dotted-line';
import Img_red_text from '../../components/news-review/main/img-redText';
import { 
    News_review, 
    Img_news_review, 
    Img_gallery_preview,
    Aside_vide_preview
} from '../../components/news-review';

const Main_aside =() => {
    const width = 200;
    const img1 = "http://simple-fauna.ru/wp-content/uploads/2016/12/Mouse-opossum.jpg";
    const img2 = "http://cdn.fishki.net/upload/post/2016/11/01/2123789/a8cdb6e529d81f72d0882a492c12d82e.jpg";
    const img3 = "http://cdn.fishki.net/upload/post/201502/14/1427852/tn/14_1.jpg";
    const title = "Lorem dolor ipsum amet conse ctetur Adipiscing elit, sdsdf rdhgasd ergts setgd";
    const text = "Nulla quis lorem, tomorrow be black time for everyone who life...";
    const author = "Ludovic XIV";
    const comments = 18;
    
    const films = [
        'https://ewedit.files.wordpress.com/2016/12/jason-momoa_0.jpg?w=612',
        'http://www.classicalmusicnews.ru/wp-content/uploads/2017/04/bolshoi-todorovsky-325x217.jpg',
        'http://static1.repo.aif.ru/1/60/790434/6c47863b4fd48992763d95c862850ef5.jpg',
        'https://www.skymedia.co.uk/wp-content/uploads/2016/01/tm1-playing-for-keeps.jpg'
    ]

    return (
        <aside className='main-aside' style={{ width: 250 }}>
            <Aside_vide_preview style={ { }} >
                <Aside_movie_line link="#" text={ text }/>
                <Aside_movie_line link="#" text={ text }/>
                <Aside_movie_line link="#" text={ text }/>
                <Aside_movie_line link="#" text={ text }/>
            </Aside_vide_preview >

            <div style={{ width: '100%', height: 230 }} >
                <a href="#">
                    <img  style={{ width: '100%', height: '100%' }}  src="https://files1.coloribus.com/files/adsarchive/part_1833/18330655/file/jack-daniels-whisky-spirit-600-49446.jpg"/>
                </a>
            </div>

            <div style={{ width: '100%', height: 212, background: '#121212', color: '#202021' }} >
                <h3 style={{ textTransform: 'uppercase' }}>Sign Up for newsletter</h3>
                <p>Sign up to receive our free newsletters!</p>
                <input type="text" placeholder="name"/>
                <input type="email" placeholder="email"/>
                <Button bsStyle="danger">Danger</Button>
                <p style={{ color: '#cf0000' }}>We do not spam. We value your privacy</p>
            </div>

            <div>
                <Head_line title="popular" doubleTitle="most read" link="dsa"/>
                <div style={{ height: 80, background: 'gray'}}/>
                <div style={{ height: 80, background: 'gray'}}/>
                <div style={{ height: 80, background: 'gray'}}/>
                <div style={{ height: 80, background: 'gray'}}/>
                <div style={{ height: 80, background: 'gray'}}/>
                <Button_more/>
            </div>
        </aside>
    );
}

export default Main_aside;