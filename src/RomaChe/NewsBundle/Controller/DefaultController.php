<?php

namespace RomaChe\NewsBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;


class DefaultController extends Controller
{
    public function indexAction(Request $request)
    {
//        $user = new User();
//        $validator = $this->get('validator');
//        $errors = $validator->validate($user);
//
//        if (count($errors) == 0) {
//            $em = $this->getDoctrine()->getManager();
//            $em->persist($user);
//            $em->flush();
//
//            return new JsonResponse(array('created' => true));
//        }
//        return new JsonResponse(array('falseValidation' => (string)$errors));
        return new JsonResponse(array('api' => 'ok'));
    }
}
