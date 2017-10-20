<?php

namespace RomaChe\AuthBundle\Helpers;

use RomaChe\AuthBundle\Entity\Users;
use RomaChe\NewsBundle\Entity\Sections;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use RomaChe\AuthBundle\Helpers\UserSectionRolesInterface;

/**
 *Checkers for user accessing to section
 */
class UserSectionRoles extends Controller implements UserSectionRolesInterface
{
  private $user;
  private $roles;
  private $sectionsRoles;

  function __construct($user)
  {
    $this->user = $user;
    $this->roles = $user->getRoles();
    $this->sectionsRoles = array();

    $this->sections = $this->getDoctrine()
        ->getRepository(Sections::class)
        ->findAll();

    $this->updateSectionsRoles();
  }
  private function getSectionNameById($id)
  {
        $section = $this->sections = $this->getDoctrine()
        ->getRepository(Sections::class)
        ->findOneBy(array('id' => $id));

        if($section != null) {
          return $section->getName();
        } else {
          return false;
        }
  }
  private function updateSectionsRoles()
  {
    foreach ($roles as $role) {
      $expRole = explode('_', $role);
      if($expRole[0] === 'ROLE') {

        if( !in_array($expRole[1], $this->sectionsRoles[]) ) {
          $this->sectionsRoles[] = $expRole[1];

          if( !in_array($expRole[2], $this->sectionsRoles[$expRole[1]]) ) {
            $this->sectionsRoles[$expRole[1]][] = $expRole[2];
          }
        }
      }
    }
  }

  public function isSectionById($idSection)
  {
    if($result = $this->getSectionNameById($idSection)) {
      return $this->isSectionByName($result);
    } else {
      return $result;
    }
  }
  public function isRoleInSectionById($idSection, $roleName)
  {
    if($result = $this->isRoleInSectionByName($idSection, $roleName)) {
      return $this->isSectionByName($result);
    } else {
      return $result;
    }
  }

  public function isSectionByName($sectionName)
  {
    $sectionName = strtoupper($sectionName);

    return in_array($sectionName, $this->sectionsRoles);
  }

  public function isRoleInSectionByName($sectionName, $roleName)
  {
    $sectionName = strtoupper($sectionName);
    $roleName = strtoupper($roleName);

    return in_array($roleName, $this->sectionsRoles[$sectionName]);
  }

  public function getSectionRoles($sectionName)
  {
    $sectionName = strtoupper($sectionName);

    if(in_array($sectionName, $this->sectionsRoles)) {
        return $this->sectionsRoles[$sectionName];
    } else {
        return false;
    }
  }
}
