<?php

namespace RomaChe\AuthBundle\Controller;

use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use RomaChe\AuthBundle\Entity\Users;

class StaffController extends Controller
{
    public function staffAction()
    {
        return $this->render('AuthBundle:Staff:staff.html.twig', array(
            // ...
        ));
    }
    public function getUserAction(Request $request = null)
    {
        if($request->getMethod() == 'POST' && $request !== null ) {

          $content = json_decode($request->getContent());

          if( $content->{'userId'} ) {
            $em = $this->getDoctrine()->getEntityManager();
            $user = $em->getRepository('AuthBundle:Users')
              ->findOneBy(array('id' => $content->{'userId'}));

            if($user !== null) {
              if($this->get('security.authorization_checker')->isGranted('ROLE_SUPER_USER')) {
                return new JsonResponse(array(
                  "type" => 'user',
                  "user" =>  $user->toArray()
                ));
              } else {
                return new JsonResponse(array(
                  "type" => 'error',
                  "message" =>  'Access exception!'
                ));
              }

            } else {
              return new JsonResponse(array(
                "type" => 'message',
                "message" => 'No user with this id'
              ));

            }
          } else {
            return new JsonResponse(array(
              "type" => 'message',
              "message" => 'Not ID!'
            ));
          }
        } elseif ($this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')) {
            return new JsonResponse(array(
                "type" => 'user',
                "user" => $this->get('security.token_storage')
                  ->getToken()
                  ->getUser()
                  ->toArray()
            ));
        } else {
            return new JsonResponse(array(
                "type" => 'error'
            ));
        }
    }
    public function getUsersListAction()
    {
        $em = $this->getDoctrine()->getEntityManager();
        $users = $em->getRepository('AuthBundle:Users')
            ->findAll();

        if(count($users) > 0) {

            $users = array_map(function($user){
                return $user->toArray();
            }, $users);

            return new JsonResponse(array(
              "type" => 'users',
              "users" => $users
            ));
          } else {
            return new JsonResponse(array(
              "type" => 'message',
              "message" => 'Don`t find anyone user!'
            ));
          }
    }

}
