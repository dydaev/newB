<?php

namespace RomaChe\NewsBundle\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class NewsController extends Controller
{
    public function listNewsAction()
    {
        return new JsonResponse(array('news' => 'list'));
    }

    public function showNewsAction()
    {
        return $this->render('NewsBundle:News:show_news.html.twig', array(
            // ...
        ));
    }

    public function updateNewsAction()
    {
        return $this->render('NewsBundle:News:update_news.html.twig', array(
            // ...
        ));
    }

    public function deleteNewsAction()
    {
        return $this->render('NewsBundle:News:delete_news.html.twig', array(
            // ...
        ));
    }

    public function createNewsAction()
    {
        return $this->render('NewsBundle:News:create_news.html.twig', array(
            // ...
        ));
    }

}
