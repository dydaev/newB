<?php

namespace RomaChe\AuthBundle\Controller;

use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use RomaChe\AuthBundle\Entity\Users;
use RomaChe\AuthBundle\Entity\Consts;
use RomaChe\AuthBundle\Entity\Role;
use Symfony\Component\VarDumper\VarDumper;

class StaffController extends Controller
{
    private function isRightUser()
    {
      
    }
    public function isRightUserAction()
    {

    }
    public function staffAction()
    {
        return $this->render('AuthBundle:Staff:staff.html.twig', array(
            // ...
        ));
    }
    private function checkGranteForAddRole($role)
    {
      $roleArr = explode('_', $role);
      if(count($roleArr) > 2) {
        return $this->get('security.authorization_checker')->isGranted('ROLE_'. $roleArr[1] .'_ADMIN') ||
        $this->get('security.authorization_checker')->isGranted('ROLE_SUPER_ADMIN');
      }
      return false;
    }
    public function checkAddingRoleAction(Request $request)
    {
      if($request->getMethod() == 'POST' && $request !== null ) {
          $content = json_decode($request->getContent());

          if($this->checkGranteForAddRole($content->{'role'})) {
            return new JsonResponse(array(
                "type" => true
              ));
          }
          return new JsonResponse(array(
              "type" => 'message',
              "message" =>  'You are have`nt rights for added role in this section',
              "color" => 'warning',
          ));
      }
      return new JsonResponse(array(
        "type" => 'message',
        "message" =>  'Not role for checking!',
        "color" => 'danger',
      ));
    }
    public function updateRolesAction(Request $request)
    {
        if($request->getMethod() == 'POST' && $request !== null ) {
          $content = json_decode($request->getContent());

          if($content->{'userId'}) {
            $em = $this->getDoctrine()->getEntityManager();
            $user = $em->getRepository('AuthBundle:Users')
              ->findOneBy(array('id' => $content->{'userId'}));

            if($user) {
              $manager = $this->getDoctrine()->getManager();
              $takedRoles = $content->{'roles'};

              foreach ($user->getRoles() as $userRole) {//delete all user roles, for updating
                  $user->removeRole($userRole);
              }

              foreach ($takedRoles as $newRoleForUser) {
                $role = $em->getRepository('AuthBundle:Role')
                  ->findOneBy(array('name' => $newRoleForUser));
                if($role === null) {
                  $role = new Role();
                  $role->setName($newRoleForUser);
                  $role->setPermission(Consts::DEFAULT_GROUP_PERMISSION);
                  $manager->persist($role);
                }
                if(!in_array($newRoleForUser, $user->getRolesNames())) {

                  $user->addRole($role);
                }
              }

              $manager->persist($user);
              $manager->flush();
              return new JsonResponse(array(
                "type" => 'user',
                "user" =>  $user->toArray()
              ));
            }
          } else {
            return new JsonResponse(array(
                "type" => 'message',
                "message" => 'No user for this ID'
            ));
          }
        }
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
              if($this->get('security.authorization_checker')->isGranted('ROLE_SUPER_ADMIN')) {
                return new JsonResponse(array(
                  "type" => 'user',
                  "user" =>  $user->toArray()
                ));
              } else {
                return new JsonResponse(array(
                  "type" => 'user',
                  "user" =>  $this->get('security.token_storage')
                    ->getToken()
                    ->getUser()
                    ->toArray()
                ));
              }

            } else {
              return new JsonResponse(array(
                "type" => 'message',
                "message" => 'No user with this id',
                "color" => 'warning'
              ));

            }
          } else {
            return new JsonResponse(array(
              "type" => 'message',
              "message" => 'Not ID!',
              "color" => 'warning'
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
    public function getUsersListAction()//TODO access control for users!!!
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
