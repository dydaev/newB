<?php

namespace RomaChe\AuthBundle\Helpers;

interface ChmodObjectServiceInterface
{
  public function getChmod();
  public function getRights()
  public function getObjectType();
  
  public function getAuthorRight();
  public function getGroupRight();
  public function getOtherRight();
}
