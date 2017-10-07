import React from 'react';

import Block_previews from '../containers/block-previews';
import Block_previews_gallery from '../containers/block-previews-gallery';
import { News_review, Img_news_review, Img_gallery_preview } from '../components/news-review';

export default function Books() {
    const width = 200;
    const img1 = "http://simple-fauna.ru/wp-content/uploads/2016/12/Mouse-opossum.jpg";
    const img2 = "http://cdn.fishki.net/upload/post/2016/11/01/2123789/a8cdb6e529d81f72d0882a492c12d82e.jpg";
    const img3 = "http://cdn.fishki.net/upload/post/201502/14/1427852/tn/14_1.jpg";
    const title = "Lorem dolor ipsum amet conse ctetur Adipiscing elit, sdsdf rdhgasd ergts setgd";
    const text = "Nulla quis lorem, tomorrow be black time for everyone who life...";
    const author = "Ludovic XIV";
    const comments = 18;

    const gallery = {
        a:'http://cita.com.ua/img/nhotels/5423/big/5424/377363227.jpg',
        b:'http://os1.img.com.ua/1/3/10989942_12ceb2a3.jpg',
        c:'http://os1.img.com.ua/1/3/10989943_fd9c0442.jpg',
        d:'https://files.brightside.me/files/news/part_4/46555/209105-3446910-1000-144645398520141015-ontake-1000-66810123c4-1484729696.jpg',
        e:'https://files.brightside.me/files/news/part_4/46555/208855-3432610-1000-1446444849comment_pngkZ7y3otB9J0WJmTBEYYcmM3S6Tydz-1000-6d51e333c8-1484729696.jpg',
        f:'https://files.brightside.me/files/news/part_4/46555/206005-12-_2_-1000-41dad920ee-1484729696.jpg'
    }
    
    return (
        <div>
            <Block_previews title="Books newss" width='455px' >
                <Img_news_review
                    img={ img1 }
                    title={ title }
                    text={ text }
                    newsId = "tra"
                    width = '145px'
                />
                <Img_news_review
                    img={ img2 }
                    title={ title }
                    text={ text }
                    newsId = "tra"
                    width = '145px'
                />
                <Img_news_review
                    img={ img3 }
                    title={ title }
                    text={ text }
                    newsId = "tra"
                    width = '145px'
                />
            </Block_previews>
            <Block_previews_gallery title="gallery" width='455px' height='210px'>
                <Img_gallery_preview src={ gallery.a } link={ gallery.a } width = '145px'/>
                <Img_gallery_preview src={ gallery.b } link={ gallery.b } width = '145px'/>
                <Img_gallery_preview src={ gallery.c } link={ gallery.c } width = '145px'/>
                <Img_gallery_preview src={ gallery.d } link={ gallery.d } width = '145px'/>
                <Img_gallery_preview src={ gallery.e } link={ gallery.e } width = '145px'/>
                <Img_gallery_preview src={ gallery.f } link={ gallery.f } width = '145px'/>
            </Block_previews_gallery>
        </div>
    );
}