<?php
namespace RomaChe\AuthBundle\Helpers;

use RomaChe\AuthBundle\Helpers\ChmodInterface;
use RomaChe\AuthBundle\Helpers\ChmodObjectServiceInterface;

class ChmodObjectService implements ChmodObjectServiceInterface
{
  private $object;
  private $chmod;
  private $rights;
  private $author;

  public function __construct(ChmodInterface $object)
  {
    //$this->$object = $object;

    $this->chmod = $object->getChmod();
    // dump($this->chmod); die();
    // $this->chmod = $this->object->getChmod();

    $this->rights = array(
      'author' => $this->dbp($this->chmod->getChmod(), 3),
      'group' => $this->dbp($this->chmod->getChmod(), 2),
      'other' => $this->dbp($this->chmod->getChmod(), 1)
    );
  }

  /**
  *@param int number
  *@param int position
  *@return int digit from number by position
  */
  private function dbp($number, $position)
  {
    return (($number / pow(10, $position - 1)) % 10);
  }

  /**
  *  @return array rights ('author'=> *, 'group'=> *, 'other'=> *)
  */
  public function getRights()
  {
    return $this->rights;
  }

  /**
   * @return string object type
   */
   public function getObjectType()
   {
     return $this->$object->getType();
   }

   /**
   *
   * @return int right for author
   */
   public function getAuthorRight()
   {
     return $this->rights['author'];
   }
   /**
   *
   * @return int right for author group
   */
   public function getGroupRight()
   {
     return $this->rights['group'];
   }
   /**
   *
   * @return int right for other readers
   */
   public function getOtherRight()
   {
     return $this->rights['other'];
   }
}
