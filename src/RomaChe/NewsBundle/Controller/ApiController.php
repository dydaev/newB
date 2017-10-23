<?php

namespace RomaChe\NewsBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

use RomaChe\AuthBundle\Helpers\UserSectionRoles;
use RomaChe\AuthBundle\Helpers\ChmodObjectService;
use RomaChe\NewsBundle\Entity\Section;
use RomaChe\AuthBundle\Entity\Consts;
use RomaChe\AuthBundle\Entity\Users;


class ApiController extends Controller
{
    private function noAuthorizedToLogin()
    {
        if (!$this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')) {
            throw $this->createAccessDeniedException();
        }

    }
    public function mainGetAction($gettingObject = null)
    {
      $result = '';
      $secStrategic = $this->get('RomaChe.SecurityStrategicService');
        switch ($gettingObject) {

          case 'sections':
          $result = array();
          $sections = $this->getDoctrine()
            ->getRepository(Section::class)
            ->findAll();

          foreach ($sections as $section) {
              $secStrategic->setPageObject($section);
              if($secStrategic->checkCan(Consts::READ)) {
                  $result[] = $section->getName();
              }
          }
          break;

          default:
          $result = '';
          $user = $this->getDoctrine()
            ->getRepository(\RomaChe\AuthBundle\Entity\Users::class)
            ->findOneBy(array('username' => 'root'));
          $result = $user->getUserName();
          break;
        }

        return new JsonResponse(array($gettingObject => $result));
    }
}