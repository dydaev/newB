<?php

namespace RomaChe\AuthBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\Role\RoleInterface;

/**
 * Roles
 *
 * @ORM\Table(name="roles")
 * @ORM\Entity(repositoryClass="RomaChe\AuthBundle\Repository\RoleRepository")
 */
class Role implements RoleInterface
{
    public function __construct()
    {
        $this->createdAt = new \DateTime();
        $this->endAt = new \DateTime('2020-01-01');
    }
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="guid")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="UUID")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255, unique=true)
     */
    private $name;

    /**
     * @var int
     *
     * @ORM\Column(name="permission", type="smallint", length=1)
     */
    private $permission;

    /**
     * @var string
     *
     * @ORM\Column(name="desctription", type="text", nullable=true)
     */
    private $desctription;

    /**
     * @var string
     *
     * @ORM\Column(name="roleGroup", type="string", length=255, nullable=true)
     */
    private $roleGroup;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="createdAt", type="datetime", nullable=true)
     */
    private $createdAt;
    /**
     * @var \DateTime
     *
     * @ORM\Column(name="endAt", type="datetime", nullable=true)
     */
    private $endAt;

    /**
     * Get dateAdd
     *
     * @return \DateTime
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * Get dateEnd
     *
     * @return \DateTime
     */
    public function getEndAt()
    {
        return $this->endAt;
    }

    /**
     * Set name
     *
     * @param DateTime $endAt
     *
     * @return Roles
     */
    public function setEndAt($endAt)
    {
        $this->endAt = $endAt;
        return $this;
    }

    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name
     *
     * @param string $name
     *
     * @return Roles
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }
    /**
     * Set name
     *
     * @param string $name
     *
     * @return Roles
     */
    public function setRole($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }
    /**
     * Get name
     *
     * @return string
     */
    public function getRole()
    {
        return $this->name;
    }

    /**
     * Set desctription
     *
     * @param string $desctription
     *
     * @return Roles
     */
    public function setDesctription($desctription)
    {
        $this->desctription = $desctription;

        return $this;
    }

    /**
     * Get desctription
     *
     * @return string
     */
    public function getDesctription()
    {
        return $this->desctription;
    }

    /**
     * Set roleGroup
     *
     * @param string $roleGroup
     *
     * @return Roles
     */
    public function setRoleGroup($roleGroup)
    {
        $this->roleGroup = $roleGroup;

        return $this;
    }

    /**
     * Get roleGroup
     *
     * @return string
     */
    public function getRoleGroup()
    {
        return $this->roleGroup;
    }

    /**
     * Set createdAt
     *
     * @param \DateTime $createdAt
     *
     * @return Role
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * Set permission
     *
     * @param integer $permission
     *
     * @return Role
     */
    public function setPermission($permission)
    {
        $this->permission = $permission;

        return $this;
    }

    /**
     * Get permission
     *
     * @return integer
     */
    public function getPermission()
    {
        return $this->permission;
    }
}
