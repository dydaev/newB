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
}
