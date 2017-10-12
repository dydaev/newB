<?php

namespace RomaChe\AuthBundle\Controller;

use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use RomaChe\AuthBundle\Entity\Users;

class LoginController extends Controller
{
    public function signinAction(Request $request)
    {
        $content = json_decode($request->getContent());

        if( $content->{'email'} ) {
          $em = $this->getDoctrine()->getEntityManager();
          $user = $em->getRepository('AuthBundle:Users')
            ->findOneBy(array('email' => $content->{'email'}));

          if($user !== null) {
            $providerKey = 'long_secure_key';
            $token = new UsernamePasswordToken($user, null, $providerKey, $user->getRoles());
            $passwordValid = $this->get('security.password_encoder')
              ->isPasswordValid($user, $content->{'_pass'});

            if($passwordValid) {
              $this->get('security.token_storage')->setToken($token);
              $this->get('session')->set('_security_'.$providerKey, serialize($token));

              return $this->redirect($this->generateUrl('check'));
            } else {

              return new JsonResponse(array(
                "type" => 'message',
                "message" => 'Wrong email or password!'
              ));
            }
          } else {
            return new JsonResponse(array(
              "type" => 'message',
              "message" => 'Wrong email or password!'
            ));
          }
        } else {
          return new JsonResponse(array(
            "type" => 'message',
            "message" => 'Please enter email'
          ));
        }
    }

    public function checkAction()
    {
        if (false === $this->get('security.authorization_checker')
          ->isGranted('IS_AUTHENTICATED_REMEMBERED')) {
            return new JsonResponse(array(
              "type" => 'isNotLogged'
            ));
        }

        $user = $this->container->get('security.token_storage')->getToken()->getUser();
        return new JsonResponse(array(
          "type" => 'isLogged',
          "name" => $user->getUsername()
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
