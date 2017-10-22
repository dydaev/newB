<?php

namespace RomaChe\NewsBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use RomaChe\AuthBundle\Helpers\PageSubjectInterface;
use Doctrine\Common\Collections\ArrayCollection;
use RomaChe\AuthBundle\Helpers\ChmodInterface;

/**
 * Section
 *
 * @ORM\Table(name="section")
 * @ORM\Entity(repositoryClass="RomaChe\NewsBundle\Repository\SectionRepository")
 */
class Section implements ChmodInterface
{
    public function __construct()
    {
        $this->createdAt = new \DateTime();
        $this->themes = new ArrayCollection();
        $this->type = 'SECTION';
    }
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    private $type;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255, unique=true)
     */
    private $name;

    /**
     * One Product has One Shipment.
     * @ORM\OneToOne(targetEntity="Chmod")
     * @ORM\JoinColumn(name="chmod_id", referencedColumnName="id")
     */
    private $chmod;

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="string", length=500, nullable=true)
     */
    private $description;
    /**
     * @var \DateTime
     *
     * @ORM\Column(name="createdAt", type="datetime")
     */
    private $createdAt;

    /**
     * One Section has Many Themes.
     * @ORM\OneToMany(targetEntity="Theme", mappedBy="section")
     */
    private $themes;

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
     * @return Section
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
     * Get name for PageSubjectInterface
     *
     * @return string
     */
    public function getSectionName()
    {
        return $this->name;
    }

    /**
     * Set description
     *
     * @param string $description
     *
     * @return Section
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
     * Set createdAt
     *
     * @param \DateTime $createdAt
     *
     * @return Section
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;

        return $this;
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
     * @param \RomaChe\NewsBundle\Entity\Chmod $chmod
     *
     * @return Section
     */
    public function setChmod(\RomaChe\NewsBundle\Entity\Chmod $chmod = null)
    {
        $this->chmod = $chmod;

        return $this;
    }

    /**
     * Get chmod
     *
     * @return \RomaChe\NewsBundle\Entity\Chmod
     */
    public function getChmod()
    {
        return $this->chmod;
    }

    /**
     * Set type
     *
     * @param string $type
     *
     * @return Section
     */
    public function setType($type)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * Get type
     *
     * @return string
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * Add theme
     *
     * @param \RomaChe\NewsBundle\Entity\Theme $theme
     *
     * @return Section
     */
    public function addTheme(\RomaChe\NewsBundle\Entity\Theme $theme)
    {
        $this->themes[] = $theme;

        return $this;
    }

    /**
     * Remove theme
     *
     * @param \RomaChe\NewsBundle\Entity\Theme $theme
     */
    public function removeTheme(\RomaChe\NewsBundle\Entity\Theme $theme)
    {
        $this->themes->removeElement($theme);
    }

    /**
     * Get themes
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getThemes()
    {
        return $this->themes;
    }
}
