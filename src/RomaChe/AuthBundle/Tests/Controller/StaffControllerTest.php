<?php

namespace RomaChe\AuthBundle\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class StaffControllerTest extends WebTestCase
{
    public function testStaff()
    {
        $client = static::createClient();

        $crawler = $client->request('GET', '/staff');
    }

}
