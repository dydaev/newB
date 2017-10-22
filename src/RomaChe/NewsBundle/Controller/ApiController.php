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
        $user = $this->get('security.token_storage')->getToken()->getUser();

        $sections = $this->getDoctrine()
            ->getRepository(Section::class)
            ->findAll(); // ->findOneBy(array('id' => $content->{'userId'}));

        $user = $this->getDoctrine()
            ->getRepository(Users::class)
            ->findOneBy(array('username' => '111'));

        $userSectionRoles =  new UserSectionRoles($this->getDoctrine()->getManager(), $user);
        $result = array();
        foreach ($sections as $section) {
          $sectionRoles = $userSectionRoles->getSectionRoles($section);
          $chmodObjectService = new ChmodObjectService($section);

          // dump($section->getChmod()->getAuthor()->getUserName());die();
          // dump($sectionRoles);
          // dump($chmodObjectService->getRights());

          if(
            (//Author rights
                $section
                  ->getChmod()
                  ->getAuthor() == $user &&
                $chmodObjectService->getAuthorRight() >= 4
            )||
            (//Group right
                count($sectionRoles) > 0 &&
                (
                  in_array('ADMIN', $sectionRoles) ||
                  $chmodObjectService->getGroupRight() >= 4
                )
            )||
            //Other rights
            $chmodObjectService->getOtherRight() >= 4
          ) {
              $result[] = $section->getName();
          }
        }

        return new JsonResponse(array($gettingObject => $result));
    }
}
