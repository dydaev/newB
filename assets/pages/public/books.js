import React from 'react';

import Block_previews from '../../containers/block-previews';
import Block_previews_gallery from '../../containers/block-previews-gallery';
import Block_previews_text4x4 from '../../containers/block-previews-text4x4';
import { News_review, Img_news_review, Img_gallery_preview } from '../../components/news-review';

export default function Books() {
    const width = 200;
    const img1 = "http://simple-fauna.ru/wp-content/uploads/2016/12/Mouse-opossum.jpg";
    const img2 = "http://cdn.fishki.net/upload/post/2016/11/01/2123789/a8cdb6e529d81f72d0882a492c12d82e.jpg";
    const img3 = "http://cdn.fishki.net/upload/post/201502/14/1427852/tn/14_1.jpg";
    const title = "Lorem dolor ipsum amet conse ctetur Adipiscing elit, sdsdf rdhgasd ergts setgd";
    const text = "Nulla quis lorem, tomorrow be black time for everyone who life...";
    const author = "Ludovic XIV";
    const comments = 18;

    const gallery = [
        'http://cita.com.ua/img/nhotels/5423/big/5424/377363227.jpg',
        'http://os1.img.com.ua/1/3/10989942_12ceb2a3.jpg',
        'http://os1.img.com.ua/1/3/10989943_fd9c0442.jpg',
        'https://files.brightside.me/files/news/part_4/46555/209105-3446910-1000-144645398520141015-ontake-1000-66810123c4-1484729696.jpg',
        'https://files.brightside.me/files/news/part_4/46555/208855-3432610-1000-1446444849comment_pngkZ7y3otB9J0WJmTBEYYcmM3S6Tydz-1000-6d51e333c8-1484729696.jpg',
        'https://files.brightside.me/files/news/part_4/46555/206005-12-_2_-1000-41dad920ee-1484729696.jpg'
    ];

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
                {gallery.map( (img, ind) =>
                    <Img_gallery_preview
                        key = { ind }
                        src={ img }
                        link={ img }
                        width = '145px'
                    />
                )}
            </Block_previews_gallery>
            <Block_previews_text4x4 title="tech news" width='455px' height='210px'>
                <News_review
                    title={ title }
                    text={ text }
                    author='Jony .D'
                    comments='7'
                    newsId = "tra"
                    width = '210px'
                    height = '95px'
                    />
                    <News_review
                    title={ title }
                    text={ text }
                    author='Semen K.'
                    comments='18'
                    newsId = "tra"
                    width = '210px'
                    height = '95px'
                    />
                    <News_review
                    title={ title }
                    text={ text }
                    author='Mukolka'
                    comments='2'
                    newsId = "tra"
                    width = '210px'
                    height = '95px'
                    />
                    <News_review
                    title={ title }
                    text={ text }
                    author='Luba'
                    comments='7'
                    newsId = "tra"
                    width = '210px'
                    height = '95px'
                    />
            </Block_previews_text4x4>
        </div>
    );
}
