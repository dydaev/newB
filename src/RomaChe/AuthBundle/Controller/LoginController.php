<?php

namespace RomaChe\AuthBundle\Controller;

use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use RomaChe\AuthBundle\Entity\Users;
use RomaChe\AuthBundle\Entity\Role;

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

    public function validationEmailAction(Request $request)
    {
      $content = json_decode($request->getContent());
      if( $content->{'email'} ) {

        //TODO parse email on regexp

        $em = $this->getDoctrine()->getEntityManager();
        $user = $em->getRepository('AuthBundle:Users')
        ->findOneBy(array('email' => $content->{'email'}));
        if($user === null) {
          return new JsonResponse(array(
            "type" => 'isValidEmail'
          ));
        }
      } else {
        return new JsonResponse(array(
          "type" => 'message',
          "message" => 'Email is empty!'
        ));
      }
      return new JsonResponse(array(
        "type" => 'message',
        "message" => 'Email already in use!'//'Email invalid!'
      ));
    }
    public function addUserAction(Request $request)
    {
        $content = json_decode($request->getContent());
        if(
          $content->{'email'} &&
          $content->{'name'} &&
          $content->{'_pass'}
        ) {

          //TODO parse email on regexp

          $em = $this->getDoctrine()->getEntityManager();
          $user = $em->getRepository('AuthBundle:Users')
            ->findOneBy(array('email' => $content->{'email'}));
          if($user === null) {
            $manager = $this->getDoctrine()->getManager();

              $roleName = 'ROLE_USER';
              $role = $em->getRepository('AuthBundle:Role')
                ->findOneBy(array('name' => $roleName));

              if($role === null) {
                $role = new Role();
                $role->setName($roleName);
              }

              $manager->persist($role);

              $user = new Users();

              $user->addRole($role);
              $user->setUsername($content->{'name'});
              $user->setEmail($content->{'email'});

              $encoder = $this->container->get('security.password_encoder');
              $password = $encoder->encodePassword($user, $content->{'_pass'});
              $user->setPassword($password);

              // $user->getUserRoles()->add($role);

              $manager->persist($user);
              $manager->flush();
              return new JsonResponse(array(
                "result" => true
              ));
          }
        } else {
          return new JsonResponse(array(
            "result" => false,
            "message" => 'Form is invalid!'
          ));
        }
        return new JsonResponse(array(
            "result" => false,
            "message" => 'Email already in use!'
        ));
    }
    public function logoutAction()
    {}

}
