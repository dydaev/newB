<?php

namespace RomaChe\AuthBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use RomaChe\AuthBundle\Entity\Users;

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

    public function addUserAction(Request $request)
    {
        $manager = $this->getDoctrine()->getManager();
        $user = new Users();

        $user->setUsername($request->get('login'));
        $user->setEmail($request->get('email'));
        $user->setDateAdd(new \DateTime());
        $user->setRoles( Array('ROLE_USER') );//ROLE_SUPER_USER

        $encoder = $this->container->get('security.password_encoder');
        $password = $encoder->encodePassword($user, $request->get('password'));
        $user->setPassword($password);

        $manager->persist($user);
        $manager->flush();
        return $this->redirectToRoute('login');
    }

}
