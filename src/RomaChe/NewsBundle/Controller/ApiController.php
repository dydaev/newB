<?php

namespace RomaChe\NewsBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

use RomaChe\AuthBundle\Helpers\ChmodObjectService;
use RomaChe\AuthBundle\Helpers\UserSectionRoles;
use RomaChe\NewsBundle\Entity\Section;
use RomaChe\AuthBundle\Entity\Consts;
use RomaChe\NewsBundle\Entity\Theme;
use RomaChe\AuthBundle\Entity\Users;


class ApiController extends Controller
{
    private function noAuthorizedToLogin()
    {
        if (!$this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')) {
            throw $this->createAccessDeniedException();
        }

    }
//------------------------------------------------------------------------------UPDATE
    public function mainUpdateAction(Request $request, $gettingObject = null)
    {
      $secStrategic = $this->get('RomaChe.SecurityStrategicService');
      $result = array();
      $content  = null;
      if ($request) {
        $content = json_decode($request->getContent());
      }
      switch ($gettingObject) {
        case 'sections_theme':
        if ($content->{'id'}) {
          $em = $this->getDoctrine()->getManager();
          $theme = $em->getRepository(Theme::class)
            ->findOneBy(array('id' => $content->{'id'}));

          if ($theme) {
            $secStrategic->setPageObject($theme);
              if($secStrategic->checkCan(Consts::WRITE)) {
                array_push($result, ['access' => 'ok']);
                if ($content->{'name'} != $theme->getName()) {
                  $theme->setName($content->{'name'});
                  array_push($result, $content->{'name'});
                }

                if ($content->{'description'} != $theme->getDescription()){
                  $theme->setDescription($content->{'description'});
                  array_push($result, $content->{'description'});
                }

                $em->flush();
                return $this->redirectToRoute('getSections', array('gettingObject' => 'sections_elements'));

              } else {
                $result = [
                  'type' => 'message',
                  'message' => 'access denite!',
                  "color" => 'warning'
                ];
                array_push($result, ['access' => 'denite']);
              }
          }
        } else {
          $result = [
            'type' => 'message',
            'message' => 'No id for udate Theme!',
            "color" => 'warning'
          ];
        }
          break;
        case 'section':
        if ($content->{'id'}) {
          $em = $this->getDoctrine()->getManager();
          $section = $em->getRepository(Section::class)
            ->findOneBy(array('id' => $content->{'id'}));

          if ($section) {
            $secStrategic->setPageObject($section);
              if($secStrategic->checkCan(Consts::WRITE)) {
                array_push($result, ['access' => 'ok']);
                if ($content->{'name'} != $section->getName()) {
                  $section->setName($content->{'name'});
                  array_push($result, $content->{'name'});
                }

                if ($content->{'description'} != $section->getDescription()){
                  $section->setDescription($content->{'description'});
                  array_push($result, $content->{'description'});
                }

                $em->flush();
                return $this->redirectToRoute('getSections', array('gettingObject' => 'sections_elements'));

              } else {
                $result = [
                  'type' => 'message',
                  'message' => 'access denite!',
                  "color" => 'warning'
                ];
                array_push($result, ['access' => 'denite']);
              }
          }
        } else {
          $result = [
            'type' => 'message',
            'message' => 'No id for update Section!',
            "color" => 'warning'
          ];
        }
          break;

        default:
          # code...
          break;
      }
      return new JsonResponse($result);
    }
//------------------------------------------------------------------------------GET
    public function mainGetAction(Request $request, $gettingObject = null)
    {
      $secStrategic = $this->get('RomaChe.SecurityStrategicService');
      $result = array();
      $content  = null;
      if ($request) {
        $content = json_decode($request->getContent());
      }
        switch ($gettingObject) {
          case 'selected_theme':
          if ($content->{'id'}) {
            $theme = $this->getDoctrine()
              ->getRepository(Theme::class)
              ->findOneBy(array('id' => $content->{'id'}));

            if ($theme) {
              $secStrategic->setPageObject($theme);
              if($secStrategic->checkCan(Consts::READ)) {
                $result = [
                  'id' => $theme->getId(),
                  'type' => 'theme',
                  'name' => $theme->getName(),
                  'writeRights' => $secStrategic->checkCan(Consts::WRITE),
                  'description' => $theme->getDescription(),
                  'createdAt' => $theme->getCreatedAt()
                ];
              }
            } else {
              $result = [
                'type' => 'message',
                'message' => 'Theme '. $content->{'id'} .' not found',
                "color" => 'warning'
              ];
            }
          }
          return new JsonResponse($result);

          case 'sections_elements':
            $elements = $this->getDoctrine()
              ->getRepository(Section::class)
              ->findAll();

            foreach ($elements as $element) {
              $secStrategic->setPageObject($element);
              if ($secStrategic->checkCan(Consts::READ)) {

                $themes = $element->getThemes();
                $subElements = array();
                foreach ($themes as $theme) {
                  $secStrategic->setPageObject($theme);

                  array_push($subElements, [
                    'id' => $theme->getId(),
                    'name' => $theme->getName(),
                    'writeRights' => $secStrategic->checkCan(Consts::WRITE),
                  ]);
                }

                $secStrategic->setPageObject($element);
                array_push($result, [
                  'id' => $element->getId(),
                  'name' => $element->getName(),
                  'subElements' => $subElements,
                  'writeRights' => $secStrategic->checkCan(Consts::WRITE),
                ]);
              }
            }

          return new JsonResponse($result);

          case 'selected_element':
          $result = array();
          // dump($content->{'id'});die();
          if ($content->{'id'}) {
            $element = $this->getDoctrine()
              ->getRepository(Section::class)
              ->findOneBy(array('id' => $content->{'id'}));

            if ($element) {
              $secStrategic->setPageObject($element);
              if($secStrategic->checkCan(Consts::READ)) {
                $result = [
                  'id' => $element->getId(),
                  'type' => 'section',
                  'name' => $element->getName(),
                  'writeRights' => $secStrategic->checkCan(Consts::WRITE),
                  'description' => $element->getDescription(),
                  'createdAt' => $element->getCreatedAt()
                ];
                $themes = $element->getThemes();
                if (count($themes) > 0) {
                  array_push($result, ['themes' => $themes ]);
                }
              }
            } else {
              $result = [
                'type' => 'message',
                'message' => 'Element '. $content->{'id'} .' not found',
                "color" => 'warning'
              ];
            }
          }
          // dump($result);die();
          return new JsonResponse($result);

          case 'sections':
          $result = array();
          $sections = $this->getDoctrine()
            ->getRepository(Section::class)
            ->findAll();

          foreach ($sections as $section) {
              $secStrategic->setPageObject($section);

              if($secStrategic->checkCan(Consts::READ)) {//check, is can read section

                  $sectionName = $section->getName();//(e.t.c. WORLD NEWS -> WORLD_NEWS)
                  $sectionName = strpos($sectionName, ' ') ?
                  implode(explode(' ', $sectionName),'_') :
                  $sectionName;

                  if($section->getThemes()->count() > 0) {
                    $result[$sectionName] = array();
                    foreach ($section->getThemes()->toArray() as $theme) {
                      $secStrategic->setPageObject($theme);
                      if($secStrategic->checkCan(Consts::READ)) {
                        array_push($result[$sectionName], [$theme->getName() => $theme->getId()] );
                      }
                    }

                  } else {
                     $result[$sectionName] = $section->getId();
                  }
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
