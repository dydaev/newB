<?php

namespace RomaChe\NewsBundle\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class NewsControllerTest extends WebTestCase
{
    public function testListnews()
    {
        $client = static::createClient();

        $crawler = $client->request('GET', '/listNews');
    }

    public function testShownews()
    {
        $client = static::createClient();

        $crawler = $client->request('GET', '/showNews');
    }

    public function testUpdatenews()
    {
        $client = static::createClient();

        $crawler = $client->request('GET', '/updateNews');
    }

    public function testDeletenews()
    {
        $client = static::createClient();

        $crawler = $client->request('GET', '/deleteNews');
    }

    public function testCreatenews()
    {
        $client = static::createClient();

        $crawler = $client->request('GET', '/createNews');
    }

}
