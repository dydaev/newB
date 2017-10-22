<?php

namespace RomaChe\NewsBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

use RomaChe\AuthBundle\Helpers\UserSectionRoles;
use RomaChe\AuthBundle\Helpers\ChmodObjectService;
use RomaChe\NewsBundle\Entity\Section;
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
        $sections = $this->getDoctrine()
            ->getRepository(Section::class)
            ->findAll(); // ->findOneBy(array('id' => $content->{'userId'}));

        $user = $this->getDoctrine()
            ->getRepository(Users::class)
            ->findOneBy(array('username' => '111'));

        $secStrategic = $this->get('RomaChe.SecurityStrategicService');
        $secStrategic->setUser($user);

        $result = array();
        foreach ($sections as $section) {

          $secStrategic->setPageObject($section);

          //dump($section->getChmod()->getAuthor()->getUserName());die();

          if(
              $secStrategic->isRightAuthor(array(4 ,5 ,6 ,7 )) ||
              $secStrategic->isRightGroup(array(4 ,5 ,6 ,7 )) ||
              $secStrategic->isRightForOther(array(4 ,5 ,6 ,7 ))
          ) {
              $result[] = $section->getName();
          }
        }

        return new JsonResponse(array($gettingObject => $result));
    }
}
