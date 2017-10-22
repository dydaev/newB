<?php
namespace RomaChe\AuthBundle\Services;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\User\UserInterface;
use Doctrine\ORM\EntityManager;

use RomaChe\AuthBundle\Helpers\ChmodObjectService;
use RomaChe\AuthBundle\Helpers\UserSectionRoles;
use RomaChe\AuthBundle\Helpers\ChmodInterface;
use RomaChe\NewsBundle\Entity\Section;
use RomaChe\AuthBundle\Entity\Users;

class SecurityStrategicService
{
    private $em;
    private $pageObject;
    private $chmodObjectService;
    private $userSectionRoles;
    private $sectionRoles;
    private $user;

    /**
    *@param EntityManager $em
    *@param $object pageObject
    *@param UserInterface user for check
    */
    public function __construct(EntityManager $em, $tokenStorage)
    {
        $this->em = $em;
        $this->user = $tokenStorage->getToken()->getUser();
        if($this->user == 'anon.') {
          $this->user = null;
        }
        $this->userSectionRoles = new UserSectionRoles($this->em, $this->user);
    }

    public function setUser(UserInterface $user)
    {
      $this->user = $user;
      $this->userSectionRoles = new UserSectionRoles($this->em, $this->user);
    }

    /**
    *@params ChmodInterface setting pageObject
    */
    public function setPageObject(ChmodInterface $pageObject)
    {
      $this->pageObject = $pageObject;
      $this->chmodObjectService = new ChmodObjectService($pageObject);
      $this->sectionRoles = $this->userSectionRoles->getSectionRoles($pageObject);
    }

    /**
    *@param array permissions number for granting array(4, 5, 6, 7)
    *@return boolean
    */
    public function isRightAuthor($permissions)
    {
      if(
          $this->isAuthor() &&
          $this->checkPermissions($this->chmodObjectService->getAuthorRight(), $permissions)
      ) {
          return true;
      }
          return false;
    }

    /**
    *@param array permissions number for granting array(4, 5, 6, 7)
    *@return boolean
    */
    public function isRightForOther($permissions)
    {
      if($this->checkPermissions($this->chmodObjectService->getOtherRight(), $permissions)) {
          return true;
      }
          return false;
    }

    /**
    *@param array permissions number for granting array(4, 5, 6, 7)
    *@return boolean
    */
    public function isRightGroup($permissions)
    {
      if(
        count($this->sectionRoles) > 0 &&
        (
          $this->isAdmin() ||
          $this->checkPermissions($this->chmodObjectService->getGroupRight(), $permissions)
        )
      ) {
          return true;
      }
          return false;
    }

    /**
    *@return bool User is admin for object
    */
    private function isAdmin()
    {
      if(in_array('ADMIN', $this->sectionRoles)) {
        return true;
      }
      return false;
    }

    /**
    *@return bool User is author this object
    */
    private function isAuthor()
    {
      if($this->pageObject->getChmod()->getAuthor() == $this->user) {
        return true;
      }
      return false;
    }

    /**
    *@param objectRights geting chmod from object
    *@param array permissions with this object opening
    *@return bool
    */
    private function checkPermissions($objectRights, $permissions)
    {
      foreach ($permissions as $permission) {
        if($objectRights == $permission) {
          return true;
        }
      }
      return false;
    }
}
