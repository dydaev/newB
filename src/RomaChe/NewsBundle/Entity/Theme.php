<?php

namespace RomaChe\NewsBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use RomaChe\AuthBundle\Helpers\ChmodInterface;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * Theme
 *
 * @ORM\Table(name="theme")
 * @ORM\Entity(repositoryClass="RomaChe\NewsBundle\Repository\ThemeRepository")
 */
class Theme implements ChmodInterface
{
    public function __construct()
    {
        $this->createdAt = new \DateTime();
        $this->newses = new ArrayCollection();
        $this->type = 'THEME';
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
     * @ORM\Column(name="type", type="string", length=255)
     */

    private $type;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255)
     */
    private $name;

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
     * One Theme has One chmod.
     * @ORM\OneToOne(targetEntity="Chmod")
     * @ORM\JoinColumn(name="chmod_id", referencedColumnName="id")
     */
    private $chmod;

    /**
     * One Theme has Many newses.
     * @ORM\OneToMany(targetEntity="News", mappedBy="theme")
     */
    private $newses;

    /**
     * @var \Section
     *
     * @ORM\ManyToOne(targetEntity="Section", inversedBy="themes")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="section_id", referencedColumnName="id")
     * })
     */
    private $section;

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
     * @return Theme
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
     * Set description
     *
     * @param string $description
     *
     * @return Theme
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
     * @return Theme
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
     * @return Theme
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
     * @return Theme
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
     * Add newse
     *
     * @param \RomaChe\NewsBundle\Entity\News $newse
     *
     * @return Theme
     */
    public function addNewse(\RomaChe\NewsBundle\Entity\News $newse)
    {
        $this->newses[] = $newse;

        return $this;
    }

    /**
     * Remove newse
     *
     * @param \RomaChe\NewsBundle\Entity\News $newse
     */
    public function removeNewse(\RomaChe\NewsBundle\Entity\News $newse)
    {
        $this->newses->removeElement($newse);
    }

    /**
     * Get newses
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getNewses()
    {
        return $this->newses;
    }

    /**
     * Set section
     *
     * @param \RomaChe\NewsBundle\Entity\Section $section
     *
     * @return Theme
     */
    public function setSection(\RomaChe\NewsBundle\Entity\Section $section = null)
    {
        $this->section = $section;

        return $this;
    }

    /**
     * Get section
     *
     * @return \RomaChe\NewsBundle\Entity\Section
     */
    public function getSection()
    {
        return $this->section;
    }
}
