<?php

namespace RomaChe\AuthBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class LoginController extends Controller
{
    public function loginAction(Request $request)
    {
        $authUtils = $this->get('security.authentication_utils');

        $error = $authUtils->getLastAuthenticationError();
        $lastUserName = $authUtils->getLastUsername();

        return $this->render('AuthBundle:Login:login.html.twig', array(
            "username" => $lastUserName,
            "error" => $error
        ));
    }

    public function logoutAction()
    {
    }

}
