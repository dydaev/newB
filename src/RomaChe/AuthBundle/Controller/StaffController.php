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
    public function getUserAction(Request $request)
    {
        $content = json_decode($request->getContent());
        if( $content->{'userId'} ) {
          $em = $this->getDoctrine()->getEntityManager();
          $user = $em->getRepository('AuthBundle:Users')
            ->findOneBy(array('id' => $content->{'userId'}));
          if($user !== null) {
            return new JsonResponse(array(
              "type" => 'user',
              "user" =>  array(
                'name' =>  $user->getUsername(),
                'email' => $user->getEmail(),
                'role' => $user->getRoles()
            )));
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
    }
    public function getUsersListAction()
    {
        $content = json_decode($request->getContent());
        if( $content->{'email'} ) {
          $em = $this->getDoctrine()->getEntityManager();
          $user = $em->getRepository('AuthBundle:Users')
            ->findOneBy(array('email' => $content->{'email'}));
        }
    }

}
