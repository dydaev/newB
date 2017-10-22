<?php

namespace RomaChe\AuthBundle\Services;

use Symfony\Component\Security\Core\User\UserInterface;
use RomaChe\AuthBundle\Helpers\PageSubjectInterface;

/**
 * Check granted user for my grantSubject
 *getUserRight
 *getSubjectAccess
 */
class GrantPagesSubject
{
  protected $user;
  protected $subject;

  private $subjectState
  private $roles; //array

  function __construct(UserInterface $user, PageSubjectInterface $subject)
  {
    $this->user = $user;
    $this->$subject = $subject;

    $this->roles = $user->getRoles();
    $this->subjectAccessState = subject->getChmod();
  }
  private function getRoleSections()
  {

  }
}
