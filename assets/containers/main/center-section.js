import React from 'react';

import Block_previews from '../block-previews';
import Block_previews_gallery from '../block-previews-gallery';
import Block_previews_text4x4 from '../block-previews-text4x4';

import Button_more from '../../components/button-more';
import Dotted_line from '../../components/dotted-line';
import Img_red_text from '../../components/news-review/main/img-redText';
import { News_review, Img_news_review, Img_gallery_preview } from '../../components/news-review';

const Main_center_section =() => {
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
        <section style={{ width: 190 }}>
            
            <Block_previews width="100%" padding='5px 0 0' title="from the desk">
                <News_review
                    title={ title }
                    text={ text }
                    newsId = "cen"
                    addedAt={ Date.now() - 1764000 }
                    width = '100%'
                />
                <Dotted_line margin="20px 0 25px"/>
                <News_review
                    title={ title }
                    text={ text }
                    newsId = "cen"
                    addedAt={ Date.now() - 1203460 }
                    width = '100%'
                />
                <Dotted_line margin="20px 0 25px"/>
                <News_review
                    title={ title }
                    text={ text }
                    newsId = "cen"
                    addedAt={ Date.now() - 7664460 }
                    width = '100%'
                />
                <Button_more link='#'/>
            </Block_previews >
            <Block_previews  width="100%" title="editorial">
                {films.map( (img, ind) => {
                    return (<Img_red_text 
                        key={ ind } 
                        img={ img }
                        text= { text }
                        link={ img } 
                        width="100%" 
                    />)
                })}

            </Block_previews >
        </section>
    );
}

export default Main_center_section;