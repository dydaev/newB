<?php

namespace RomaChe\AuthBundle\Helpers;

interface UserSectionRolesInterface
{
  public function getSectionRoles($sectionName);

  public function isSectionById($idSection);
  public function isRoleInSectionById($idSection, $roleName);
  public function isSectionByName($sectionName);
  public function isRoleInSectionByName($sectionName, $roleName);

}
