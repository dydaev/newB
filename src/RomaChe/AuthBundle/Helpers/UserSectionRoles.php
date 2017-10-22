<?php

namespace RomaChe\AuthBundle\Helpers;

use Doctrine\ORM\EntityManager;
use RomaChe\AuthBundle\Entity\Users;
use RomaChe\NewsBundle\Entity\Section;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use RomaChe\AuthBundle\Helpers\UserSectionRolesInterface;

/**
 *Checkers for user accessing to section
 */
class UserSectionRoles implements UserSectionRolesInterface
{
  private $em;
  private $user;
  private $roles;
  private $sectionsRoles;

  function __construct(EntityManager $em,$user = null)
  {
    $this->em = $em;
    if($user !== null && $user instanceof UserInterface) {
      $this->user = $user;
      $this->roles = $user->getRoles();
      $this->sectionsRoles = array();

      $this->sections = $this->em->getRepository(Section::class)
        ->findAll();

      $this->updateSectionsRoles();
    } else {
      $this->user = null;
      $this->sectionsRoles = array();
    }
  }

  /**
  *@param int  $sectionId
  *@return section name
  */
  private function getSectionNameById($sectionId)
  {
        $section = $this->em->getRepository(Section::class)
        ->findOneBy(array('id' => $sectionId));

        if($section != null) {
          return $section->getName();
        } else {
          return false;
        }
  }
  private function updateSectionsRoles()
  {
    foreach ($this->roles as $role) {
      $expRole = explode('_', $role->getName());
      if($expRole[0] === 'ROLE' && count($expRole) > 2) {
        if( !array_key_exists($expRole[1], $this->sectionsRoles) ) {
          $this->sectionsRoles[$expRole[1]] = array();

          if( !in_array($expRole[2], $this->sectionsRoles[$expRole[1]]) ) {
            $this->sectionsRoles[$expRole[1]][] = $expRole[2];
          }
        }
      }
    }
  }

  /**
  *@param int  $sectionId
  *@return true/false checked is section by id
  */
  public function isSectionById($idSection)
  {
    if($result = $this->getSectionNameById($idSection)) {
      return $this->isSectionByName($result);
    } else {
      return $result;
    }
  }

  /**
  *@param int  $sectionId
  *@param int  $roleName
  *@return true/false checker, section is have role
  */
  public function isRoleInSectionById($idSection, $roleName)
  {
    if($result = $this->isRoleInSectionByName($idSection, $roleName)) {
      return $this->isSectionByName($result);
    } else {
      return $result;
    }
  }

  /**
  *@param string  $sectionName
  *@return true/false checked is section by name
  */
  public function isSectionByName($sectionName)
  {
    $sectionName = strtoupper($sectionName);

    return in_array($sectionName, $this->sectionsRoles);
  }

  /**
  *@param int  $sectionName
  *@param int  $roleName
  *@return true/false checker, section is have role
  */
  public function isRoleInSectionByName($sectionName, $roleName)
  {
    $sectionName = strtoupper($sectionName);
    $roleName = strtoupper($roleName);

    return in_array($roleName, $this->sectionsRoles[$sectionName]);
  }

  /**
  *@param string  $sectionName
  *@return array roles by section name
  */
  public function getSectionRoles($sectionName)
  {
    if($sectionName instanceof ChmodInterface) {
      $sectionName = strtoupper($sectionName->getName());
    } else {
      $sectionName = strtoupper($sectionName);
    }
    if(array_key_exists($sectionName, $this->sectionsRoles)) {
        return $this->sectionsRoles[$sectionName];
    } else {
      if(array_key_exists('SUPER', $this->sectionsRoles)) {
        return $this->sectionsRoles['SUPER'];
      }
        return array();
    }
  }
}
