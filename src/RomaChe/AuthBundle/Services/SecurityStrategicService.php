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
use RomaChe\AuthBundle\Entity\Consts;


class SecurityStrategicService
{
    private $em;
    private $pageObject;
    private $chmodObjectService;
    private $userSectionRoles;
    private $sectionRoles;
    private $user;
    private $authorizationChecker;

    /**
    *@param EntityManager $em
    *@param $object pageObject
    *@param UserInterface user for check
    */
    public function __construct(EntityManager $em, $tokenStorage, $authorizationChecker)
    {
        $this->em = $em;
        $this->sectionRoles = array();
        $this->userSectionRoles = array();
        $this->authorizationChecker = $authorizationChecker;

        $this->setUser($tokenStorage->getToken()->getUser());
    }

    public function setUser($user = null)
    {
      if($user != null && $user instanceof UserInterface ) {
        $this->user = $user;
        $this->userSectionRoles = new UserSectionRoles($this->em, $this->user);
      } else {
        $this->user = null;
      }
    }

    /**
    *@params ChmodInterface setting pageObject
    */
    public function setPageObject(ChmodInterface $pageObject)
    {
      $this->pageObject = $pageObject;
      $this->chmodObjectService = new ChmodObjectService($pageObject);
      if(count($this->userSectionRoles) > 0) {
        $this->sectionRoles = $this->userSectionRoles->getSectionRoles($pageObject);
      }
    }

    /**
    *@param int , right for red(4), write(2) or execute(1) the object
    *@param array permissions number for granting array(4, 5, 6, 7)
    *@return boolean
    */
    public function isRightAuthor($right, $permissions = null)
    {
      $permissions = $permissions ? $permissions : array(Consts::DEFAULT_AUTHOR_PERMISSION);

      if($this->isAuthor()) {
          return $this->checkPermissions($this->chmodObjectService->getAuthorRight(), $permissions, $right);
      }
      return false;
    }

    /**
    *@param int , right for red(4), write(2) or execute(1) the object
    *@param array permissions number for granting array(4, 5, 6, 7)
    *@return boolean
    */
    public function isRightForOther($right, $permissions = null)
    {
      $permissions = $permissions ? $permissions : array(Consts::DEFAULT_OTHER_USERS_PERMISSION);

      if($this->checkPermissions($this->chmodObjectService->getOtherRight(), $permissions, $right)) {
          return true;
      }
      return false;
    }

    /**
    *@param int , right for red(4), write(2) or execute(1) the object
    *@param array permissions number for granting array(4, 5, 6, 7)
    *@return boolean
    */
    public function isRightGroup($right, $permissions = null)
    {
      $permissions = $permissions ? $permissions :
      ( $this->sectionRoles ? $this->sectionRoles['permissions'] : array() );
      if(
          $this->isAdmin() ||
          $this->checkPermissions($this->chmodObjectService->getGroupRight(), $permissions, $right)
      ) {
          return true;
      }
      return false;
    }

    public function checkCan($right)
    {
      return $this->isHaveAccess($right);
    }

    /**
    *@var int group mask for work. Author and other is standart(CONSTANT) permission
    *@param int , author right for red(4), write(2) or execute(1) the object
    *@return boolean
    */
    public function isHaveAccess($right)
    {
      return $this->isAllRight($right, $right, $right);
    }

    /**
    *@param int , author right for red(4), write(2) or execute(1) the object
    *@param int , group right for red(4), write(2) or execute(1) the object
    *@param int , other users right for red(4), write(2) or execute(1) the object
    *@return boolean
    */
    public function isAllRight($author, $group, $other)
    {
      $result = false;
      if($this->authorizationChecker->isGranted('IS_AUTHENTICATED_FULLY')) {
        $result =
          $this->isRightAuthor($author) || $this->isRightGroup($group);
      }
      $result = $result || $this->isRightForOther($other);

      return $result;
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
    *@param int , right for red(4), write(2) or execute(1) the object
    *@return bool
    */
    private function checkPermissions($objectRights, $permissions, $right = 0)
    {
      foreach ($permissions as $permission) {
        $res = $objectRights & $permission & $right;
        if($res) {
          return true;
        }
      }
      return false;
    }
}
