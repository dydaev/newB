<?php

namespace RomaChe\NewsBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use RomaChe\AuthBundle\Entity\Users;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * Chmod
 *
 * @ORM\Table(name="chmod")
 * @ORM\Entity(repositoryClass="RomaChe\NewsBundle\Repository\ChmodRepository")
 */
class Chmod
{
    public function __construct()
    {
        $this->createdAt = new \DateTime();
    }
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="string", length=500, nullable=true)
     */
    private $description;

    /**
     * @var int
     *
     * @ORM\Column(name="chmod", type="integer")
     */
    private $chmod;

    /**
     * @var string
     *
     * @ORM\Column(name="groupName", type="string", length=255)
     */
    private $groupName;

    /**
     * Many Chmods have One Author.
     * @ORM\ManyToOne(targetEntity="RomaChe\AuthBundle\Entity\Users", inversedBy="chmods")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     */
    private $author;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="createdAt", type="datetime")
     */
    private $createdAt;


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
     * Set description
     *
     * @param string $description
     *
     * @return Chmod
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set name
     *
     * @param string $name
     *
     * @return Chmod
     */
    public function setName($name)
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
     * Get createdAt
     *
     * @return \DateTime
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * Set chmod
     *
     * @param integer $chmod
     *
     * @return Chmod
     */
    public function setChmod($chmod)
    {
        $this->chmod = $chmod;

        return $this;
    }

    /**
     * Get chmod
     *
     * @return integer
     */
    public function getChmod()
    {
        return $this->chmod;
    }

    /**
     * Set groupName
     *
     * @param string $groupName
     *
     * @return Chmod
     */
    public function setGroupName($groupName)
    {
        $this->groupName = $groupName;

        return $this;
    }

    /**
     * Get groupName
     *
     * @return string
     */
    public function getGroupName()
    {
        return $this->groupName;
    }

    /**
     * Set createdAt
     *
     * @param \DateTime $createdAt
     *
     * @return Chmod
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;

        return $this;
    }


    /**
     * Set author
     *
     * @param \RomaChe\AuthBundle\Entity\Users $author
     *
     * @return Chmod
     */
    public function setAuthor(\RomaChe\AuthBundle\Entity\Users $author = null)
    {
        $this->author = $author;

        return $this;
    }

    /**
     * Get author
     *
     * @return \RomaChe\AuthBundle\Entity\Users
     */
    public function getAuthor()
    {
        return $this->author;
    }
}
