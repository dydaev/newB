<?php

namespace RomaChe\NewsBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * Tag
 *
 * @ORM\Table(name="tag")
 * @ORM\Entity(repositoryClass="RomaChe\NewsBundle\Repository\TagRepository")
 */
class Tag
{

    public function __construct() {
        $this->newses = new ArrayCollection();
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
     * @ORM\Column(name="name", type="string", length=255, unique=true)
     */
    private $name;

    /**
     * Many Tags have Many Newses.
     * @ORM\ManyToMany(targetEntity="News", mappedBy="tags")
     */
    private $newses;

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
     * @return Tag
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
     * Add newse
     *
     * @param \RomaChe\NewsBundle\Entity\News $newse
     *
     * @return Tag
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
}
